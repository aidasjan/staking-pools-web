import { useToast } from '@chakra-ui/react'
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

export const useApi = () => {
  const toast = useToast()

  const sendRequest = async (
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
  ) => {
    const userDataString = localStorage.getItem('user')
    const userData = userDataString ? JSON.parse(userDataString) : null

    try {
      const response = await axios({
        method,
        url: `${BASE_URL}${path}`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: userData ? `Bearer ${userData.token}` : ''
        },
        data: JSON.stringify(body),
        withCredentials: true
      })

      if (response.status === 204) {
        return null
      }

      return response.data
    } catch (error: any) {
      if (error.response?.status.toString().startsWith('4')) {
        const errorResult = error.response.data
        toast({ status: 'error', title: errorResult.message })
      } else if (error.response.toString().startsWith('5')) {
        toast({
          status: 'error',
          title: 'Something went wrong. Please try again later.'
        })
      }

      return null
    }
  }

  const getChallenge = async (address: string) => {
    await sendRequest('/sanctum/csrf-cookie', 'GET')
    return await sendRequest('/api/auth/challenge', 'POST', { address })
  }

  const loginUser = async (address: string, signature: string) =>
    await sendRequest('/api/auth/login', 'POST', { address, signature })

  const getSelfUser = async () => await sendRequest('/api/users/self', 'GET')

  const updateSelfUser = async (name: string, email: string) =>
    await sendRequest('/api/users/self', 'PUT', { name, email })

  return {
    getChallenge,
    loginUser,
    getSelfUser,
    updateSelfUser
  }
}
