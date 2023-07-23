import React, { useState } from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import { Container, Loader } from 'components'
import { usePools } from 'hooks/usePools'
import Pools from './components/Pools'
import Pool from './components/Pool'

const Staking = () => {
  const { pools, tokenAddress, isLoading, stakeTokens, unstakeTokens } =
    usePools()
  const [selectedPoolAddress, setSelectedPoolAddress] = useState<string | null>(
    null
  )

  return (
    <Container>
      <Box textAlign="center" my={24}>
        <Heading size="2xl">Staking Pools</Heading>
        <Box mt={3} fontSize="xl">
          Stake your tokens and receive rewards!
        </Box>
      </Box>
      {isLoading && <Loader label="Loading Pools" />}
      {pools && !isLoading && (
        <SimpleGrid columns={{ base: 1, xl: 2 }} gap={6}>
          <Pools
            pools={pools}
            selectedPoolAddress={selectedPoolAddress}
            onPoolSelected={setSelectedPoolAddress}
          />
          {selectedPoolAddress && tokenAddress ? (
            <Pool
              pool={pools.find((pool) => pool.address === selectedPoolAddress)}
              tokenAddress={tokenAddress}
              onTokensStake={stakeTokens}
              onTokensUnstake={unstakeTokens}
            />
          ) : (
            <Box textAlign="center" fontSize="3xl" opacity={0.5} my={24}>
              Select a pool to stake
            </Box>
          )}
        </SimpleGrid>
      )}
    </Container>
  )
}

export default Staking
