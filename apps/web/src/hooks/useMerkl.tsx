import { supportedChainIdV4 } from '@pancakeswap/farms'
import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Token } from '@pancakeswap/sdk'
import { TokenInfo } from '@pancakeswap/token-lists'
import { useToast } from '@pancakeswap/uikit'
import { useQuery } from '@tanstack/react-query'
import { ToastDescriptionWithTx } from 'components/Toast'
import { distributorABI } from 'config/abi/AngleProtocolDistributor'
import { FAST_INTERVAL } from 'config/constants'
import { DISTRIBUTOR_ADDRESSES } from 'config/merkl'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useMasterchefV3 } from 'hooks/useContract'
import uniq from 'lodash/uniq'
import { useCallback, useMemo } from 'react'
import { useCurrentBlockTimestamp as useBlockTimestamp } from 'state/block/hooks'
import { useAllLists } from 'state/lists/hooks'
import { isAddressEqual } from 'utils'
import { getContract } from 'utils/contractHelpers'
import { Address } from 'viem'
import { useWalletClient } from 'wagmi'

export const MERKL_API_V4 = 'https://api.merkl.xyz/v4'

export function useMerklInfo(poolAddress?: string | null): {
  rewardsPerToken: CurrencyAmount<Currency>[]
  isPending: boolean
  transactionData: {
    claim: string
    token: string
    leaf: string
    proof?: string[]
  } | null
  hasMerkl: boolean
  refreshData: () => void
  merklApr?: number
} {
  const { account, chainId } = useAccountActiveChain()
  const currentTimestamp = useBlockTimestamp()
  const masterChefV3Address = useMasterchefV3()?.address as Address
  const lists = useAllLists()

  const { data, isPending, refetch } = useQuery({
    queryKey: [`fetchMerklPools`],
    queryFn: async () => {
      const responsev4 = await fetch(
        `${MERKL_API_V4}/opportunities?${supportedChainIdV4.join(
          ',',
        )}&test=false&items=1000&action=POOL,HOLD&status=LIVE`,
      )

      if (!responsev4.ok) {
        throw responsev4
      }

      const merklDataV4 = await responsev4.json()

      const opportunities = merklDataV4?.filter(
        (opportunity) =>
          opportunity?.tokens?.[0]?.symbol?.toLowerCase().startsWith('cake-lp') ||
          opportunity?.protocol?.id?.toLowerCase().startsWith('pancakeswap'),
      )

      if (!opportunities || !opportunities.length) return undefined

      const pools = await Promise.all(
        opportunities.map(async (opportunity) => {
          const responseCampaignV4 = await fetch(`${MERKL_API_V4}/opportunities/${opportunity.id}/campaigns`)
          if (!responseCampaignV4.ok) {
            throw responseCampaignV4
          }
          const campaignV4 = await responseCampaignV4.json()
          return { ...opportunity, campaigns: campaignV4?.campaigns }
        }),
      )

      return { pools }
    },
    enabled: Boolean(poolAddress),
    staleTime: FAST_INTERVAL,
    retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 30000),
  })

  const { data: userData } = useQuery({
    queryKey: [`fetchMerkl-${chainId}-${account}`],
    queryFn: async () => {
      if (!chainId) return undefined

      const responsev4 = await fetch(`${MERKL_API_V4}/users/${account}/rewards?chainId=${chainId}`)

      if (!responsev4.ok) {
        throw responsev4
      }

      const merklDataV4 = await responsev4.json()

      if (!merklDataV4) return undefined

      return merklDataV4
    },
    enabled: Boolean(data && chainId && account && poolAddress),
    staleTime: FAST_INTERVAL,
    retryDelay: (attemptIndex) => Math.min(2000 * 2 ** attemptIndex, 30000),
  })

  return useMemo(() => {
    const pool = data?.pools?.filter((opportunity) => isAddressEqual(opportunity.identifier, poolAddress))?.[0]

    if (!pool || !currentTimestamp)
      return {
        rewardsPerToken: [],
        rewardTokenAddresses: [],
        transactionData: null,
        refreshData: refetch,
        hasMerkl: false,
        isPending,
      }

    const hasLive =
      pool.status === 'LIVE' &&
      pool.apr > 0 &&
      Boolean(
        pool.campaigns?.some((campaign) => {
          const { startTimestamp, endTimestamp, whitelist, blacklist } = campaign
          const startTimestampNumber = Number(startTimestamp)
          const endTimestampNumber = Number(endTimestamp)
          const isLive = startTimestampNumber <= currentTimestamp && currentTimestamp <= endTimestampNumber
          if (!isLive) return false
          const whitelistValid =
            !whitelist ||
            whitelist.length === 0 ||
            whitelist.includes(account) ||
            whitelist.includes(masterChefV3Address)

          const blacklistValid =
            !blacklist ||
            blacklist.length === 0 ||
            !blacklist.includes(account) ||
            !blacklist.includes(masterChefV3Address)

          return whitelistValid && blacklistValid
        }),
      )

    const rewardAddresses = (
      pool.rewardsRecord?.breakdowns?.flatMap((breakdown) => breakdown.token.address) || []
    ).filter((address, index, allAddresses) => allAddresses.indexOf(address) === index)

    const chainUserData = userData?.filter((chainUserReward) => chainUserReward?.chain?.id === pool.chainId)?.[0]

    const rewardsPerTokenObject = chainUserData?.rewards
      ?.filter((reward) => rewardAddresses.some((rewardAddress) => isAddressEqual(reward.token.address, rewardAddress)))
      .filter((reward) => {
        const { amount, claimed } = reward || {}
        const unclaimed = BigInt(amount || 0) - BigInt(claimed || 0)
        return unclaimed > 0
      })

    const transactionData = rewardsPerTokenObject?.reduce((acc, reward) => {
      // eslint-disable-next-line no-param-reassign
      acc[reward?.token?.address] = { proof: reward?.proofs, claim: reward?.amount }
      return acc
    }, {})

    const rewardResult = {
      hasMerkl: Boolean(hasLive),
      rewardsPerToken: rewardsPerTokenObject
        ? rewardsPerTokenObject
            .map((tokenInfo) => {
              const {
                amount,
                claimed,
                token: { address, decimals, symbol },
              } = tokenInfo

              const token = new Token(chainId as number, address as Address, decimals, symbol)
              const unclaimed = BigInt(amount || 0) - BigInt(claimed || 0)
              return CurrencyAmount.fromRawAmount(token, unclaimed)
            })
            .filter(Boolean)
        : [],
      rewardTokenAddresses: uniq(rewardsPerTokenObject?.map((tokenInfo) => tokenInfo?.token?.address)),
      transactionData,
      isPending,
    }

    const { rewardsPerToken = [], rewardTokenAddresses = [], ...rest } = rewardResult

    const rewardCurrencies = rewardsPerToken.length
      ? rewardsPerToken
      : (rewardTokenAddresses as string[])
          .reduce<TokenInfo[]>((result, address) => {
            Object.values(lists).find((list) => {
              const token: TokenInfo | undefined = list?.current?.tokens.find((t) => isAddressEqual(t.address, address))

              if (token) return result.push(token)

              return false
            })

            return result
          }, [])
          .map((info) => {
            const t = new Token(chainId as number, info.address, info.decimals, info.symbol)

            return CurrencyAmount.fromRawAmount(t, '0')
          })

    const merklApr = pool?.apr as number | undefined

    return {
      ...rest,
      rewardsPerToken: rewardCurrencies,
      refreshData: refetch,
      merklApr,
    }
  }, [chainId, data, lists, refetch, isPending, poolAddress, account, masterChefV3Address, currentTimestamp, userData])
}

export default function useMerkl(poolAddress?: string) {
  const { account, chainId } = useAccountActiveChain()

  const { data: signer } = useWalletClient()

  const { transactionData, rewardsPerToken, refreshData, hasMerkl } = useMerklInfo(poolAddress)

  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isTxPending } = useCatchTxError()
  const { toastSuccess } = useToast()
  const { t } = useTranslation()

  const claimTokenReward = useCallback(async () => {
    const contractAddress = chainId ? DISTRIBUTOR_ADDRESSES[chainId] : undefined

    if (!account || !contractAddress || !signer) return undefined

    const distributorContract = getContract({
      abi: distributorABI,
      address: contractAddress as Address,
      signer,
    })

    if (!transactionData || !distributorContract) return undefined

    const tokens = rewardsPerToken
      .map((rewardToken) => {
        const tokenAddress = rewardToken.currency.wrapped.address
        const tokenTransactionData = transactionData[tokenAddress]

        if (!tokenTransactionData || !tokenTransactionData.proof || tokenTransactionData.claim === '0') return undefined

        return tokenAddress
      })
      .filter(Boolean) as string[]

    const claims = tokens.map((token) => transactionData[token].claim)
    const proofs = tokens.map((token) => transactionData[token].proof)

    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(distributorContract, 'claim', [
        tokens.map((_) => account),
        tokens as Address[],
        claims,
        proofs as Address[][],
      ])
    })

    if (receipt?.status) {
      toastSuccess(
        t('Success!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Merkl Rewards are claimed')}
        </ToastDescriptionWithTx>,
      )

      refreshData()
    }

    // Fix eslint warning
    return undefined
  }, [
    chainId,
    account,
    signer,
    transactionData,
    fetchWithCatchTxError,
    rewardsPerToken,
    callWithGasPrice,
    toastSuccess,
    t,
    refreshData,
  ])

  return useMemo(
    () => ({
      hasMerkl,
      rewardsPerToken,
      claimTokenReward,
      isClaiming: isTxPending,
    }),
    [claimTokenReward, hasMerkl, isTxPending, rewardsPerToken],
  )
}
