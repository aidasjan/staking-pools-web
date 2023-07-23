import React, { type FormEvent, useState, useEffect } from 'react'
import { Box, Heading, Input, Button, useToast } from '@chakra-ui/react'
import { Container, Loader } from 'components'
import { useApi } from 'hooks/useApi'
import { useUser } from 'providers/UserProvider'

const Profile = () => {
  const { getSelfUser, updateSelfUser } = useApi()
  const { user, updateUser } = useUser()
  const toast = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadUser = () => {
    setIsLoading(true)
    getSelfUser().then((result) => {
      setName(result.name)
      setEmail(result.email)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    loadUser()
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!user) {
      return
    }
    const updatedUser = await updateSelfUser(name, email)
    if (!updatedUser) {
      return
    }
    updateUser({ ...user, name: updatedUser.name, email: updatedUser.email })
    toast({ status: 'success', title: 'Updated' })
  }

  return (
    <Container maxW="600px">
      <Box bg="purple.700" borderRadius="xl" p={6}>
        <Heading>Profile</Heading>
        {isLoading && <Loader />}
        {!isLoading && (
          <form onSubmit={handleSubmit}>
            <Box mt={3}>
              <Box mb={1}>Address</Box>
              <Box fontWeight="bold">{user?.address}</Box>
            </Box>
            <Box mt={3}>
              <Box mb={1}>Name</Box>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
              />
            </Box>
            <Box mt={3}>
              <Box mb={1}>Email</Box>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </Box>
            <Button type="submit" mt={4} colorScheme="purple" w="full">
              Update
            </Button>
          </form>
        )}
      </Box>
    </Container>
  )
}

export default Profile
