import { useUserCakeLockStatus } from 'hooks/useUserCakeLockStatus'
import { useMemo } from 'react'
import { useCompetitionStatus } from './useCompetitionStatus'
import { useIfoStatus } from './useIfoStatus'
import { useTradingRewardStatus } from './useTradingRewardStatus'
import { useVotingStatus } from './useVotingStatus'

export const useMenuItemsStatus = (): Record<string, string> => {
  const ifoStatus = useIfoStatus()
  const competitionStatus = useCompetitionStatus()
  const votingStatus = useVotingStatus()
  const isUserLocked = useUserCakeLockStatus()
  const tradingRewardStatus = useTradingRewardStatus()

  return useMemo(() => {
    return {
      '/competition': competitionStatus || '',
      '/ifo': ifoStatus || '',
      ...(votingStatus && {
        '/voting': votingStatus,
      }),
      ...(isUserLocked && {
        '/pools': 'lock_end',
      }),
      ...(tradingRewardStatus && {
        '/trading-reward': tradingRewardStatus,
      }),
    }
  }, [competitionStatus, ifoStatus, votingStatus, isUserLocked, tradingRewardStatus])
}
