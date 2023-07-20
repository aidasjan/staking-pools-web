import React from 'react'
import {
  Container as ChakraContainer,
  type ContainerProps
} from '@chakra-ui/react'

interface Props extends ContainerProps {
  maxW?: string
  children: any
}

const Container = ({ maxW, children }: Props) => {
  return <ChakraContainer maxW={maxW ?? '1200px'} my={12}>{children}</ChakraContainer>
}

export default Container
