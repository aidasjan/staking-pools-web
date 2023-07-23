import React from 'react'
import { Box, CloseButton, Flex, Text, type BoxProps } from '@chakra-ui/react'
import NavItem from './NavItem'
import { useLocation } from 'react-router-dom'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  const location = useLocation()

  const items = [
    { title: 'Staking', icon: 'fas fa-coins', to: '/' },
    { title: 'Profile', icon: 'fas fa-user', to: '/profile' }
  ]

  return (
    <Box
      w={{ base: 'full', md: 64 }}
      bg="purple.700"
      pos="fixed"
      h="full"
      shadow="lg"
    >
      <Flex h={20} alignItems="center" justifyContent="space-between" mx={5} mb={6}>
        <Text fontSize="md" fontWeight="bold">
          Staking Pools
        </Text>
        <CloseButton onClick={onClose} display={{ base: 'flex', md: 'none' }} />
      </Flex>
      {items.map((item) => (
        <>
          <NavItem
            key={item.to}
            target={item.to}
            icon={item.icon}
            isSelected={location.pathname === item.to}
            onClick={onClose}
          >
            {item.title}
          </NavItem>
        </>
      ))}
    </Box>
  )
}

export default SidebarContent
