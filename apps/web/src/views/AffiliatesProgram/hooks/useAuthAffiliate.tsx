import { useAccount } from 'wagmi'
import { getCookie, deleteCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'

export interface FeeType {
  affiliateAddress: string
  createdAt: string
  id: number
  linkId: string
  perpsFee: number
  signature: string
  stableSwapFee: number
  updatedAt: string
  v2SwapFee: number
  v3SwapFee: number
}

export interface MetricDetail {
  totalEarnFeeUSD: string
  totalPerpSwapEarnFeeUSD: string
  totalStableSwapEarnFeeUSD: string
  totalTradeVolumeUSD: string
  totalUsers: number
  totalV2SwapEarnFeeUSD: string
  totalV3SwapEarnFeeUSD: string
}

export interface InfoDetail {
  availableFeeUSD: string
  active: boolean
  address: string
  createdAt: string
  email: string
  name: string
  updatedAt: string
  fees: FeeType[]
  nickName: string
  ablePerps: boolean
  metric: MetricDetail
}

interface AffiliateInfoType {
  isAffiliate: boolean
  affiliate: InfoDetail
  refresh: () => void
}

interface AffiliateInfoResponse {
  status: 'success' | 'error'
  affiliate: InfoDetail
}

const initAffiliateData: InfoDetail = {
  active: false,
  address: '',
  createdAt: '',
  email: '',
  name: '',
  updatedAt: '',
  availableFeeUSD: '0',
  fees: [],
  nickName: '',
  ablePerps: false,
  metric: {
    totalEarnFeeUSD: '0',
    totalPerpSwapEarnFeeUSD: '0',
    totalStableSwapEarnFeeUSD: '0',
    totalTradeVolumeUSD: '0',
    totalUsers: 0,
    totalV2SwapEarnFeeUSD: '0',
    totalV3SwapEarnFeeUSD: '0',
  },
}

const useAuthAffiliate = (): AffiliateInfoType => {
  const { address } = useAccount()

  const { data, refetch } = useQuery({
    queryKey: ['affiliates-program', 'auth-affiliate', address],

    queryFn: async () => {
      try {
        const response = await fetch(`/api/affiliates-program/affiliate-info`)
        const result: AffiliateInfoResponse = await response.json()

        return {
          isAffiliate: result.status === 'success',
          affiliate: result.affiliate,
        }
      } catch (error) {
        console.error(`Fetch Affiliate Exist Error: ${error}`)
        return {
          isAffiliate: false,
          affiliate: initAffiliateData,
        }
      }
    },

    enabled: Boolean(address),
  })

  return {
    isAffiliate: (data?.isAffiliate && !!address) ?? false,
    affiliate: data?.affiliate ?? initAffiliateData,
    refresh: refetch,
  }
}

export default useAuthAffiliate
