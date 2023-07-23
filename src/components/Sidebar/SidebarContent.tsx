import React from 'react'
import { Box, CloseButton, Flex, Text, type BoxProps } from '@chakra-ui/react'
import NavItem from './NavItem'
import { useUser } from 'providers/UserProvider'

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  const items = [{ title: 'Staking', icon: 'fas fa-coins', to: '/' }]

  return (
    <Box
      w={{ base: 'full', md: 64 }}
      bg="purple.700"
      pos="fixed"
      h="full"
      shadow="lg"
    >
      <Flex h={20} alignItems="center" mx={5} justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold">
          Staking Pools
        </Text>
        <CloseButton onClick={onClose} display={{ base: 'flex', md: 'none' }} />
      </Flex>
      {items.map((item) => (
        <>
          <NavItem target={item.to} icon={item.icon} onClick={onClose}>
            {item.title}
          </NavItem>
        </>
      ))}
    </Box>
  )
}

export default SidebarContent
