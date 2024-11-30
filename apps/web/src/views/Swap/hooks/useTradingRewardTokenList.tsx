import { useActiveChainId } from 'hooks/useActiveChainId'
import { useV3FarmAPI } from 'hooks/useV3FarmAPI'
import { useMemo } from 'react'
import useAllTradingRewardPair, { RewardStatus, RewardType } from 'views/TradingReward/hooks/useAllTradingRewardPair'

const useTradingRewardTokenList = () => {
  const { chainId } = useActiveChainId()
  const { farms } = useV3FarmAPI(chainId)

  const { data } = useAllTradingRewardPair({
    status: RewardStatus.ALL,
    type: RewardType.CAKE_STAKERS,
  })

  const uniqueAddressList = useMemo(() => {
    const currentTime = Date.now() / 1000

    // eslint-disable-next-line array-callback-return, consistent-return
    const activeRewardCampaignId = data.campaignIds.filter((campaignId) => {
      const incentive = data.campaignIdsIncentive.find((i) => i.campaignId === campaignId)
      if (incentive?.campaignClaimTime && currentTime <= incentive.campaignClaimTime) {
        return campaignId
      }
    })

    const activeCampaignPairs: { [key in string]: Array<string> } = {}
    activeRewardCampaignId.forEach((campaignId) => {
      if (data.campaignPairs[campaignId]) {
        activeCampaignPairs[campaignId] = data.campaignPairs[campaignId][chainId!]
      }
    })

    const tokenAddressArray = Object.values(activeCampaignPairs).reduce((acc, val) => {
      val?.forEach((item) => acc.add(item))
      return acc
    }, new Set())

    return [...tokenAddressArray]
  }, [chainId, data])

  const tokenPairs = useMemo(() => {
    return (
      uniqueAddressList
        // eslint-disable-next-line array-callback-return, consistent-return
        .map((list) => {
          const pair = farms?.find((farm) => farm.lpAddress.toLowerCase() === (list as string).toLowerCase())
          if (pair) return pair
        })
        .filter((i) => Boolean(i))
    )
  }, [uniqueAddressList, farms])

  return {
    tokenPairs,
  }
}

export default useTradingRewardTokenList
