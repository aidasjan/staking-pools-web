import { useEffect, useState } from 'react'
import { readContract, writeContract, waitForTransaction } from '@wagmi/core'
import { type StakingPool } from 'types/pool'
import stakingPoolFactoryAbi from 'data/abi/StakingPoolFactory.json'
import stakingPoolAbi from 'data/abi/StakingPool.json'
import erc20Abi from 'data/abi/ERC20.json'
import { formatEther, parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { useToast } from '@chakra-ui/react'

export const usePools = () => {
  const { address: account } = useAccount()
  const toast = useToast()
  const [poolAddresses, setPoolAddresses] =
    useState<Array<`0x${string}`> | null>(null)
  const [pools, setPools] = useState<StakingPool[]>()
  const [tokenAddress, setTokenAddress] = useState<`0x${string}`>()
  const [isLoading, setIsLoading] = useState(true)

  const handleError = (e: any) => {
    toast({
      title: 'An error has occurred while making transaction',
      description: e.reason ?? e.message,
      status: 'error'
    })
    console.error(e)
  }

  const getContractProperty = async (
    propertyName: string,
    contractInfo: {
      address: `0x${string}`
      abi: typeof stakingPoolFactoryAbi | typeof stakingPoolAbi
    },
    args?: any[]
  ) => {
    return readContract({
      address: contractInfo.address,
      abi: contractInfo.abi,
      functionName: propertyName,
      args
    }) as any
  }

  const checkTokenApproval = async (amount: number, spender: string) => {
    if (!tokenAddress) {
      return
    }
    const allowance = await getContractProperty(
      'allowance',
      {
        address: tokenAddress,
        abi: erc20Abi
      },
      [account, spender]
    )
    const tokenAllowance = parseFloat(formatEther(allowance))
    if (tokenAllowance >= amount) {
      return true
    }
    return false
  }

  const getPoolDetails = async () => {
    if (!poolAddresses) {
      return
    }

    setIsLoading(true)

    const poolDetails = await Promise.all(
      poolAddresses.map(async (poolAddress: `0x${string}`) => {
        const contractInfo = {
          address: poolAddress,
          abi: stakingPoolAbi
        }

        const minStakingPeriod = await getContractProperty(
          'minStakingPeriod',
          contractInfo
        )
        const maxStakingPeriod = await getContractProperty(
          'maxStakingPeriod',
          contractInfo
        )
        const maxStakingAmount = await getContractProperty(
          'maxStakingAmount',
          contractInfo
        )
        const capacity = await getContractProperty('capacity', contractInfo)
        const hourlyReward = await getContractProperty(
          'hourlyReward',
          contractInfo
        )
        const totalStaked = await getContractProperty(
          'totalStaked',
          contractInfo
        )

        const contractProperties = {
          address: poolAddress,
          minStakingPeriod: Number(minStakingPeriod),
          maxStakingPeriod: Number(maxStakingPeriod),
          maxStakingAmount: Number(formatEther(maxStakingAmount)),
          capacity: Number(formatEther(capacity)),
          hourlyReward: Number(hourlyReward),
          totalStaked: Number(formatEther(totalStaked))
        }

        if (account) {
          const stake = await getContractProperty('stakes', contractInfo, [
            account
          ])
          return {
            ...contractProperties,
            accountStake: Number(formatEther(stake[0])),
            accountStakeTime: Number(stake[1])
          }
        }
        return contractProperties
      })
    )
    setPools(poolDetails)
    setIsLoading(false)
  }

  const getPools = async () => {
    const addresses = await getContractProperty('getAllStakingPools', {
      address: process.env.REACT_APP_FACTORY_ADDRESS as `0x${string}`,
      abi: stakingPoolFactoryAbi
    })
    setPoolAddresses(addresses)
  }

  const getTokenAddress = async () => {
    const address = await getContractProperty('tokenAddress', {
      address: process.env.REACT_APP_FACTORY_ADDRESS as `0x${string}`,
      abi: stakingPoolFactoryAbi
    })
    setTokenAddress(address)
  }

  const stakeTokens = async (poolAddress: `0x${string}`, amount: number) => {
    if (!tokenAddress) {
      return
    }
    try {
      const tokensApproved = await checkTokenApproval(amount, poolAddress)
      if (!tokensApproved) {
        const txResult = await writeContract({
          address: tokenAddress,
          functionName: 'approve',
          abi: erc20Abi,
          args: [poolAddress, parseEther(`${amount}`)]
        })
        await waitForTransaction({ hash: txResult.hash })
      }
      const txResult = await writeContract({
        address: poolAddress,
        functionName: 'stakeTokens',
        abi: stakingPoolAbi,
        args: [parseEther(`${amount}`)]
      })
      await waitForTransaction({ hash: txResult.hash })
      getPoolDetails()
    } catch (e) {
      handleError(e)
    }
  }

  const unstakeTokens = async (poolAddress: `0x${string}`) => {
    try {
      const txResult = await writeContract({
        address: poolAddress,
        functionName: 'unstakeTokens',
        abi: stakingPoolAbi
      })
      await waitForTransaction({ hash: txResult.hash })
      getPoolDetails()
    } catch (e) {
      handleError(e)
    }
  }

  useEffect(() => {
    getPools()
    getTokenAddress()
  }, [])

  useEffect(() => {
    if (poolAddresses) {
      getPoolDetails()
    }
  }, [poolAddresses])

  return { pools, tokenAddress, isLoading, stakeTokens, unstakeTokens }
}
