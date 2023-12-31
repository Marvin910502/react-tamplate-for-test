import { ReactElement, forwardRef } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
// @mui
import { Box, Link } from '@mui/material'
// config
import { ICON } from 'src/config'
// type
import { NavItemProps } from '../type'
//
import Iconify from '../../Iconify'
import { ListItemStyle } from './style'
import { isExternalLink } from '..'

// ----------------------------------------------------------------------

export const NavItemRoot = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  NavItemProps
>(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
	const { title, path, icon, children } = item

	if (children) {
		return (
			<ListItemStyle
				ref={ref}
				open={open}
				activeRoot={active}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<NavItemContent icon={icon} title={title} child={children} />
			</ListItemStyle>
		)
	}

	return isExternalLink(path) ? (
		<ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
			<NavItemContent icon={icon} title={title} child={children} />
		</ListItemStyle>
	) : (
		<ListItemStyle component={RouterLink} to={path} activeRoot={active}>
			<NavItemContent icon={icon} title={title} child={children} />
		</ListItemStyle>
	)
})
NavItemRoot.displayName = 'NavItemRoot'
// ----------------------------------------------------------------------

export const NavItemSub = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  NavItemProps
>(({ item, active, open, onMouseEnter, onMouseLeave }, ref) => {
	const { title, path, icon, children } = item

	if (children) {
		return (
			<ListItemStyle
				ref={ref}
				subItem
				disableRipple
				open={open}
				activeSub={active}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
			>
				<NavItemContent icon={icon} title={title} child={children} subItem />
			</ListItemStyle>
		)
	}

	return isExternalLink(path) ? (
		<ListItemStyle
			subItem
			href={path}
			disableRipple
			rel="noopener"
			target="_blank"
			component={Link}
		>
			<NavItemContent icon={icon} title={title} child={children} subItem />
		</ListItemStyle>
	) : (
		<ListItemStyle
			disableRipple
			component={RouterLink}
			to={path}
			activeSub={active}
			subItem
		>
			<NavItemContent icon={icon} title={title} child={children} subItem />
		</ListItemStyle>
	)
})
NavItemSub.displayName = 'NavItemSub'
// ----------------------------------------------------------------------

type NavItemContentProps = {
  title: string
  icon?: ReactElement
  child?: { title: string; path: string }[]
  subItem?: boolean
}

function NavItemContent({ icon, title, child, subItem }: NavItemContentProps) {
	return (
		<>
			{icon && (
				<Box
					component="span"
					sx={{
						mr: 1,
						width: ICON.NAVBAR_ITEM_HORIZONTAL,
						height: ICON.NAVBAR_ITEM_HORIZONTAL,
						'& svg': { width: '100%', height: '100%' },
					}}
				>
					{icon}
				</Box>
			)}
			{title}
			{child && (
				<Iconify
					icon={subItem ? 'eva:chevron-right-fill' : 'eva:chevron-down-fill'}
					sx={{
						ml: 0.5,
						width: ICON.NAVBAR_ITEM_HORIZONTAL,
						height: ICON.NAVBAR_ITEM_HORIZONTAL,
					}}
				/>
			)}
		</>
	)
}
