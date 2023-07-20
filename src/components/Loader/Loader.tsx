import React from 'react'
import { Box, Center, Spinner } from '@chakra-ui/react'

interface Props {
  label?: string
}

const Loader = ({ label }: Props) => {
  return (
    <Center py={12} w="full" flexDirection="column">
      <Box>
        <Spinner size="xl" />
      </Box>
      {label && (
        <Box textAlign="center" mt={3}>
          {label}
        </Box>
      )}
    </Center>
  )
}

export default Loader
