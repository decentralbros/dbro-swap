import { ChainId } from '@pancakeswap/chains'
import { getAllGauges } from '@pancakeswap/gauges'
import { getViemClients } from 'utils/viem'
import { describe, it } from 'vitest'

describe('get all guages', () => {
  it('contract gaguges and cms gauges should be match', async () => {
    const gauges = await getAllGauges(
      getViemClients({
        chainId: ChainId.BSC,
      }),
      {
        testnet: false,
        inCap: false,
        bothCap: false,
        killed: true,
      },
    )
    const notMatched = gauges.find((x) => !x.pairAddress)
    expect(notMatched).toBeUndefined()
  }, 300000)
})
