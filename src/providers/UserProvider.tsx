import React, { createContext, useContext } from 'react'
import { type User } from 'types/user'
import { useAccount } from 'wagmi'
import { useAuthenticate } from 'hooks/useAuthenticate'

interface AuthInfo {
  user: User | null
  authenticate: (authInfo: { address?: string }) => Promise<void>
  updateUser: (userData: User) => void
}

interface Props {
  children: any
}

const initialValue = {
  user: null,
  authenticate: async () => {},
  updateUser: () => {}
}

const UserContext = createContext<AuthInfo>(initialValue)

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }: Props) => {
  const { user, updateUser, authenticate, logout } = useAuthenticate()
  useAccount({ onConnect: authenticate, onDisconnect: logout })

  return (
    <UserContext.Provider value={{ user, authenticate, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
