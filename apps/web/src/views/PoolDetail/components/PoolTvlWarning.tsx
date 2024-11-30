import { getChainName } from '@pancakeswap/chains'
import { Protocol } from '@pancakeswap/farms'
import { useTranslation } from '@pancakeswap/localization'
import { Message, MessageText, Text } from '@pancakeswap/uikit'
import { PoolInfo } from 'state/farmsV4/state/type'
import { TextLink } from 'views/Ifos/components/IfoCardStyles'
import { useRouterQuery } from '../hooks/useRouterQuery'

const ONE_BILLION = 1_000_000_000
export const PoolTvlWarning = ({ poolInfo }: { poolInfo: PoolInfo }) => {
  const { t } = useTranslation()
  const { id, chainId } = useRouterQuery()
  const tvlUsd = parseFloat(poolInfo.tvlUsd ?? '0')
  const { protocol } = poolInfo
  const chain = getChainName(chainId)

  const version = `${protocol === Protocol.V3 ? '/v3/' : ''}`
  const stableSwap = `${protocol === Protocol.STABLE ? '?type=stableSwap' : ''}`
  const link = `https://decentralbros.finance/info/${version}${chain}/pairs/${id}${stableSwap}`
  if (tvlUsd < ONE_BILLION) {
    return null
  }
  return (
    <Message my="24px" mx="24px" variant="warning">
      <MessageText fontSize="17px">
        <Text color="warning" as="span">
          {t('TVL and APR data may not be reflected correctly due to technical limitation, please refer to')}{' '}
          <TextLink target="_blank" href={link}>
            {t('info page')}
          </TextLink>{' '}
          {t('for accurate values')}
        </Text>
      </MessageText>
    </Message>
  )
}
