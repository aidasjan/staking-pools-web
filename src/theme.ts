import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Open Sans, sans-serif'
  },
  styles: {
    global: {
      body: {
        background: 'purple.900'
      }
    }
  }
})
