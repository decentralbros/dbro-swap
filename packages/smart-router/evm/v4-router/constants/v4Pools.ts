// TODO: move to sdk

import { zeroAddress, type Address } from 'viem'

export const CL_PRESETS: {
  fee: number
  tickSpacing: number
}[] = [
  {
    fee: 500,
    tickSpacing: 10,
  },
  {
    fee: 100,
    tickSpacing: 1000,
  },
]

export const CL_HOOKS: Address[] = [zeroAddress]

export const BIN_PRESETS: {
  fee: number
  binStep: number
}[] = [
  {
    fee: 500,
    binStep: 10,
  },
  {
    fee: 100,
    binStep: 10,
  },
]

export const BIN_HOOKS: Address[] = [zeroAddress]
