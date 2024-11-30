import { useTranslation } from '@pancakeswap/localization'
import { Tag } from '@pancakeswap/uikit'
import { useMerklInfo } from 'hooks/useMerkl'

export function MerklTag({ poolAddress }: { poolAddress: string | null }) {
  const { t } = useTranslation()
  const { hasMerkl } = useMerklInfo(poolAddress)

  if (!hasMerkl) return null

  return (
    <Tag ml="8px" outline variant="warning">
      {t('Merkl')}
    </Tag>
  )
}

export function MerklRewardsTag({ poolAddress }: { poolAddress: string | null | `0x${string}` | undefined }) {
  const { t } = useTranslation()
  const { hasMerkl } = useMerklInfo(poolAddress as string)

  if (!hasMerkl) return null

  return (
    <Tag variant="warning" mr="8px" outline>
      {t('Merkl Rewards')}
    </Tag>
  )
}
