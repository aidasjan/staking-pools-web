import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/react'

interface NavItemProps {
  target: string
  icon: string
  isSelected: boolean
  children: ReactNode
  onClick: () => void
}

const NavItem = ({
  children,
  icon,
  isSelected,
  target,
  onClick
}: NavItemProps) => {
  return (
    <NavLink to={target}>
      <Flex
        align="center"
        px={5}
        py={3}
        mx={4}
        role="group"
        cursor="pointer"
        color="gray.100"
        bg={isSelected ? 'purple.500' : undefined}
        borderRadius="3xl"
        onClick={onClick}
      >
        <Box className={icon} w={8}></Box>
        {children}
      </Flex>
    </NavLink>
  )
}

export default NavItem
