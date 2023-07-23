import React from 'react'
import { Box, Heading, Progress, SimpleGrid } from '@chakra-ui/react'
import { type StakingPool } from 'types/pool'

interface Props {
  pools: StakingPool[]
  selectedPoolAddress: string | null
  onPoolSelected: (poolAddress: string) => void
}

const Pools = ({ pools, selectedPoolAddress, onPoolSelected }: Props) => {
  return (
    <Box>
      <Box bg="purple.700" borderRadius="xl" p={6}>
        <Heading size="lg" mb={4}>
          Available Pools
        </Heading>
        {pools.map((pool) => (
          <Box
            key={pool.address}
            borderRadius="xl"
            bg={
              pool.address === selectedPoolAddress ? 'purple.500' : 'purple.600'
            }
            cursor="pointer"
            p={3}
            mt={2}
            onClick={() => {
              onPoolSelected(pool.address)
            }}
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} alignItems="center">
              <Heading size="md">{pool.hourlyReward}% per hour</Heading>
              <Box fontWeight="bold" mt={1}>
                {pool.minStakingPeriod / 60} min lock
              </Box>
            </SimpleGrid>
            <Progress
              mt={2}
              colorScheme="purple"
              value={(pool.totalStaked / pool.capacity) * 100}
            />
            <Box fontSize="sm" opacity={0.75} mt={1}>
              {((pool.totalStaked / pool.capacity) * 100).toFixed(2)}% filled
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Pools
