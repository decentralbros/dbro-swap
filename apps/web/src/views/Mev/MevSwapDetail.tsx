import { useTranslation } from '@pancakeswap/localization'
import { Box, QuestionHelperV2, SkeletonV2, Text } from '@pancakeswap/uikit'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import { useIsConnectedMetaMask, useIsMEVEnabled } from './hooks'

export const MevSwapDetail: React.FC = () => {
  const { t } = useTranslation()
  const isConnected = useIsConnectedMetaMask()
  const { isMEVEnabled, isLoading } = useIsMEVEnabled()
  if (!isConnected && !isMEVEnabled) {
    return null
  }
  return (
    <Box mt="10px" p="0px 4px">
      <RowBetween>
        <RowFixed>
          <QuestionHelperV2
            text={t('PancakeSwap MEV Guard protects you from frontrunning and sandwich attacks when Swapping.')}
            placement="top-start"
          >
            <Text
              fontSize="14px"
              color="textSubtle"
              style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}
            >
              {t('MEV Protect')}
            </Text>
          </QuestionHelperV2>
        </RowFixed>
        <RowFixed>
          <SkeletonV2 width="80px" height="16px" borderRadius="8px" minHeight="auto" isDataReady={!isLoading}>
            <Text fontSize="14px">{isMEVEnabled ? `${t('Enabled')}` : `${t('Disabled')}`}</Text>
          </SkeletonV2>
        </RowFixed>
      </RowBetween>
    </Box>
  )
}
