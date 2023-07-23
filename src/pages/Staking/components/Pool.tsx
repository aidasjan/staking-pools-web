import React from 'react'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Progress,
  SimpleGrid
} from '@chakra-ui/react'
import { type StakingPool } from 'types/pool'
import { useToken } from 'wagmi'
import { Loader } from 'components'
import StakingForm from './StakingForm'

interface Props {
  pool?: StakingPool
  tokenAddress: string
  onTokensStake: (poolAddress: `0x${string}`, amount: number) => Promise<void>
  onTokensUnstake: (poolAddress: `0x${string}`) => Promise<void>
}

const Pool = ({
  pool,
  tokenAddress,
  onTokensStake,
  onTokensUnstake
}: Props) => {
  const { data: token, isLoading: isTokenLoading } = useToken({
    address: tokenAddress as `0x${string}`
  })

  if (!pool) {
    return null
  }

  if (isTokenLoading || !token) {
    return <Loader />
  }

  const reward =
    pool.accountStakeTime && pool.accountStake
      ? ((Date.now() / 1000 - pool.accountStakeTime) / 3600) *
        ((pool.accountStake * pool.hourlyReward) / 100)
      : 0

  const maxReward = pool.accountStake
    ? (pool.maxStakingPeriod * pool.accountStake * pool.hourlyReward) /
      3600 /
      100
    : 0

  const poolProperties = [
    {
      label: 'Min. staking period',
      value: `${pool.minStakingPeriod / 60} min`
    },
    {
      label: 'Max. staking period',
      value: `${pool.maxStakingPeriod / 60} min`
    },
    {
      label: 'Max. staking amount',
      value: `${pool.maxStakingAmount} ${token.symbol}`
    },
    { label: 'Total stakes', value: `${pool.totalStaked} ${token.symbol}` }
  ]

  const accountPoolProperties = [
    {
      label: 'You have staked',
      value: `${pool.accountStake} ${token.symbol}`
    },
    {
      label: 'Tokens unlock time',
      value: pool.accountStakeTime
        ? `${new Date(
            (pool.accountStakeTime + pool.minStakingPeriod) * 1000
          ).toUTCString()}`
        : null
    },
    {
      label: 'Reward',
      value: `${
        reward > maxReward ? maxReward.toFixed(2) : reward.toFixed(2)
      } ${token.symbol}`
    }
  ]

  return (
    <Box bg="purple.700" borderRadius="xl" p={6}>
      <Heading size="lg" mb={6}>
        {pool.hourlyReward}% per hour
      </Heading>
      {poolProperties.map((poolProperty) => (
        <Flex
          key={poolProperty.label}
          justify="space-between"
          fontSize="lg"
          mt={3}
        >
          <Box>{poolProperty.label}</Box>
          <Box fontWeight="bold">{poolProperty.value}</Box>
        </Flex>
      ))}
      {pool.accountStake && pool.accountStake > 0 ? (
        <>
          <Divider my={4} />
          {accountPoolProperties.map((poolProperty) => (
            <Flex
              key={poolProperty.label}
              justify="space-between"
              fontSize="lg"
              bg="purple.900"
              py={2}
              px={4}
            >
              <Box>{poolProperty.label}</Box>
              <Box fontWeight="bold">{poolProperty.value}</Box>
            </Flex>
          ))}
        </>
      ) : null}

      <Divider my={4} />
      <StakingForm
        pool={pool}
        token={token}
        onTokensStake={onTokensStake}
        onTokensUnstake={onTokensUnstake}
      />
    </Box>
  )
}

export default Pool
