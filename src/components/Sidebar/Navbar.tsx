import React from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface Props {
  onOpen: () => void
}

const Navbar = ({ onOpen }: Props) => {
  const { user } = useUser()
  return (
    <>
      <Flex
        ml={{ base: 0, md: 64 }}
        px={{ base: 4, md: 24 }}
        height={16}
        alignItems="center"
        bg="gray.700"
        justifyContent="flex-end"
      >
        <ConnectButton />
        {user && <Box ml={3}>{user.name}</Box>}
        <IconButton
          onClick={onOpen}
          ml={4}
          aria-label="menu"
          display={{ base: 'block', lg: 'none' }}
        >
          <Box className="fa fa-bars" />
        </IconButton>
      </Flex>
    </>
  )
}

export default Navbar
