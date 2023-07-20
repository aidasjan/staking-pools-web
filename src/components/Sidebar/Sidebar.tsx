import React, { type ReactNode } from 'react'
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'
import Navbar from './Navbar'
import SidebarContent from './SidebarContent'

const Sidebar = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="full">
      <Box display={{ base: 'none', md: 'flex' }}>
        <SidebarContent onClose={onClose} />
      </Box>
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 64 }}>{children}</Box>
    </Box>
  )
}

export default Sidebar
