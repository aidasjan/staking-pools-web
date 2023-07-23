import React from 'react'
import {
  Box,
  Container as ChakraContainer,
  Heading,
  type ContainerProps,
  Button,
  Flex
} from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useAuthenticate } from 'hooks/useAuthenticate'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface Props {
  element: any
}

const AuthRequired = ({ element }: Props) => {
  const { address: account } = useAccount()
  const { user, authenticate } = useUser()

  if (!account) {
    return (
      <Flex direction="column" align="center" mt={32}>
        <Heading size="lg" mb={6} textAlign="center">
          Please connect to wallet
        </Heading>
        <ConnectButton />
      </Flex>
    )
  }

  if (!user) {
    return (
      <Flex direction="column" align="center">
        <Heading size="lg" mb={6} textAlign="center" mt={32}>
          Please authenticate
        </Heading>
        <Button
          colorScheme="purple"
          onClick={() => {
            authenticate({ address: account })
          }}
        >
          Authenticate
        </Button>
      </Flex>
    )
  }

  return element
}

export default AuthRequired
