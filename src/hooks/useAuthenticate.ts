import { useApi } from './useApi'
import { signMessage } from '@wagmi/core'
import { type User } from 'types/user'
import { useState } from 'react'

export const useAuthenticate = () => {
  const { getChallenge, loginUser } = useApi()
  const [user, setUser] = useState<User | null>(null)

  const updateUser = (userData: User) => {
    const updatedUser = { ...user, ...userData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const authenticate = async ({ address }: { address?: string }) => {
    if (!address) {
      return
    }
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      return
    }
    try {
      const challengeResult = await getChallenge(address)
      const signedChallenge = await signMessage({
        message: challengeResult.challenge
      })
      const authUser = await loginUser(address, signedChallenge)
      updateUser(authUser)
    } catch (e) {
      console.error(e)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return {
    user,
    updateUser,
    authenticate,
    logout
  }
}
