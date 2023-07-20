import React, { type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Flex, Box } from '@chakra-ui/react'

interface NavItemProps {
  target: string
  icon: string
  children: ReactNode
  onClick: () => void
}

const NavItem = ({ children, icon, target, onClick }: NavItemProps) => {
  return (
    <NavLink to={target}>
      <Flex
        align="center"
        p={3}
        mx={4}
        role="group"
        cursor="pointer"
        color="gray.300"
        onClick={onClick}
        _hover={{
          color: 'purple.300'
        }}
      >
        <Box className={icon} w={8}></Box>
        {children}
      </Flex>
    </NavLink>
  )
}

export default NavItem
