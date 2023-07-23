import React, { useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  useToast
} from '@chakra-ui/react'
import { type StakingPool } from 'types/pool'
import { useAccount, useBalance, useToken } from 'wagmi'
import { type FetchTokenResult } from '@wagmi/core'
import { formatEther } from 'viem'
import { Loader } from 'components'
import { ConnectButton } from '@rainbow-me/rainbowkit'

interface Props {
  pool: StakingPool
  token: FetchTokenResult
  onTokensStake: (poolAddress: `0x${string}`, amount: number) => Promise<void>
  onTokensUnstake: (poolAddress: `0x${string}`) => Promise<void>
}

const StakingForm = ({
  pool,
  token,
  onTokensStake,
  onTokensUnstake
}: Props) => {
  const { address: account } = useAccount()
  const { data: balance } = useBalance({
    address: account,
    token: token.address
  })
  const toast = useToast()
  const [stakingAmount, setStakingAmount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleStake = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!balance) {
      return
    }
    if (!stakingAmount || isNaN(stakingAmount)) {
      toast({ status: 'error', title: 'Please select staking amount' })
      return
    }
    if (stakingAmount > parseFloat(formatEther(balance.value))) {
      toast({
        status: 'error',
        title: 'Amount is greater than balance'
      })
      return
    }
    if (stakingAmount > pool.maxStakingAmount) {
      toast({
        status: 'error',
        title: 'Amount is greater than max staking amount'
      })
      return
    }
    setIsLoading(true)
    await onTokensStake(pool.address, stakingAmount)
    setIsLoading(false)
  }

  const handleUnstake = async () => {
    setIsLoading(true)
    await onTokensUnstake(pool.address)
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader label="Processing Transaction" />
  }

  return (
    <Box>
      {pool.accountStake === 0 && balance && (
        <>
          <SimpleGrid columns={{ base: 1, md: 2 }} alignItems="center">
            <Box fontSize="xl">Stake Amount</Box>
            <Box textAlign="right">
              Balance: {parseFloat(formatEther(balance.value)).toFixed(2)}{' '}
              {token.symbol}
            </Box>
          </SimpleGrid>
          <form onSubmit={handleStake}>
            <Input
              type="number"
              placeholder="0.0"
              bg="purple.800"
              size="lg"
              mt={2}
              onChange={(e) => {
                setStakingAmount(parseFloat(e.target.value))
              }}
            />
            <Button type="submit" mt={3} colorScheme="purple" w="full">
              Stake
            </Button>
          </form>
        </>
      )}

      {pool.accountStake && pool.accountStakeTime && pool.accountStake > 0 ? (
        <Button
          colorScheme="purple"
          w="full"
          onClick={handleUnstake}
          isDisabled={
            pool.accountStakeTime + pool.minStakingPeriod > Date.now() / 1000
          }
        >
          Withdraw
        </Button>
      ) : null}

      {!account && (
        <Flex direction="column" align="center">
          <Heading size="md" mb={3} textAlign="center">
            Connect wallet to stake
          </Heading>
          <ConnectButton />
        </Flex>
      )}
    </Box>
  )
}

export default StakingForm
