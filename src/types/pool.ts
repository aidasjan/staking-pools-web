export interface StakingPool {
  address: `0x${string}`
  minStakingPeriod: number
  maxStakingPeriod: number
  maxStakingAmount: number
  capacity: number
  hourlyReward: number
  totalStaked: number
  accountStake?: number
  accountStakeTime?: number
}
