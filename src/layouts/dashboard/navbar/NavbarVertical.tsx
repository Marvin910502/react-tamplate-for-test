import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
// @mui
import { styled, useTheme } from '@mui/material/styles'
import { Box, Stack, Drawer } from '@mui/material'
// hooks
import useResponsive from '../../../hooks/useResponsive'
import useCollapseDrawer from '../../../hooks/useCollapseDrawer'
// utils
import cssStyles from '../../../utils/cssStyles'
// config
import { NAVBAR } from 'src/config'
// components
import Logo from '../../../components/Logo'
import Scrollbar from '../../../components/Scrollbar'
import { NavSectionVertical } from '../../../components/nav-section'
//
import navConfig from './NavConfig'
import NavbarDocs from './NavbarDocs'
import NavbarAccount from './NavbarAccount'
import CollapseButton from './CollapseButton'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		transition: theme.transitions.create('width', {
			duration: theme.transitions.duration.shorter,
		}),
	},
}))

// ----------------------------------------------------------------------

type Props = {
  isOpenSidebar: boolean
  onCloseSidebar: VoidFunction
}
/**
 * @component NavbarVertical
 * @description NavbarVertical is the vertical navbar of the dashboard
 * @param {boolean} isOpenSidebar - is the sidebar open or not
 * @param {VoidFunction} onCloseSidebar - function to close the sidebar when it is open
 * @returns {React.Component}
 * @example
 * <NavbarVertical isOpenSidebar={isOpenSidebar} onCloseSidebar={onCloseSidebar} />
 */
export default function NavbarVertical({
	isOpenSidebar,
	onCloseSidebar,
}: Props) {
	const theme = useTheme()

	const { pathname } = useLocation()

	const isDesktop = useResponsive('up', 'lg')

	const {
		isCollapse,
		collapseClick,
		collapseHover,
		onToggleCollapse,
		onHoverEnter,
		onHoverLeave,
	} = useCollapseDrawer()

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar()
		}
	}, [pathname])

	const renderContent = (
		<Scrollbar
			sx={{
				height: 1,
				'& .simplebar-content': {
					height: 1,
					display: 'flex',
					flexDirection: 'column',
				},
			}}
		>
			<Stack
				spacing={3}
				sx={{
					pt: 3,
					pb: 2,
					px: 2.5,
					flexShrink: 0,
					...(isCollapse && { alignItems: 'center' }),
				}}
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Logo />

					{isDesktop && !isCollapse && (
						<CollapseButton
							onToggleCollapse={onToggleCollapse}
							collapseClick={collapseClick}
						/>
					)}
				</Stack>

				<NavbarAccount isCollapse={isCollapse} />
			</Stack>

			<NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} />

			<Box sx={{ flexGrow: 1 }} />

			{!isCollapse && <NavbarDocs />}
		</Scrollbar>
	)

	return (
		<RootStyle
			sx={{
				width: {
					lg: isCollapse
						? NAVBAR.DASHBOARD_COLLAPSE_WIDTH
						: NAVBAR.DASHBOARD_WIDTH,
				},
				...(collapseClick && {
					position: 'absolute',
				}),
			}}
		>
			{!isDesktop && (
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
				>
					{renderContent}
				</Drawer>
			)}

			{isDesktop && (
				<Drawer
					open
					variant="persistent"
					onMouseEnter={onHoverEnter}
					onMouseLeave={onHoverLeave}
					PaperProps={{
						sx: {
							width: NAVBAR.DASHBOARD_WIDTH,
							borderRightStyle: 'dashed',
							bgcolor: 'background.default',
							transition: (theme) =>
								theme.transitions.create('width', {
									duration: theme.transitions.duration.standard,
								}),
							...(isCollapse && {
								width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
							}),
							...(collapseHover && {
								...cssStyles(theme).bgBlur(),
								boxShadow: (theme) => theme.customShadows.z24,
							}),
						},
					}}
				>
					{renderContent}
				</Drawer>
			)}
		</RootStyle>
	)
}
