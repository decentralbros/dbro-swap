import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { getDecimalAmount, getFullDisplayBalance } from '@pancakeswap/utils/formatBalance'
import BN from 'bignumber.js'
import { WEEK } from 'config/constants/veCake'
import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import { useLockCakeData } from 'state/vecake/hooks'
import styled from 'styled-components'
import { useProxyVeCakeBalance } from 'views/StakingDBRO/hooks/useProxyVeCakeBalance'
import { useTargetUnlockTime } from 'views/StakingDBRO/hooks/useTargetUnlockTime'
import { useVeCakeAmount } from 'views/StakingDBRO/hooks/useVeCakeAmount'
import { MyVeCakeCard } from '../MyVeCakeCard'
import { DataRow } from './DataBox'
import { formatDate } from './format'

const ValueText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: #1bf696;
`

interface NewStakingDataSetProps {
  cakeAmount?: number
  customVeCakeCard?: JSX.Element
  customDataRow?: JSX.Element
}

export const NewStakingDataSet: React.FC<React.PropsWithChildren<NewStakingDataSetProps>> = ({
  cakeAmount = 0,
  customVeCakeCard,
  customDataRow,
}) => {
  const { t } = useTranslation()
  const { cakeLockWeeks } = useLockCakeData()
  const { isDesktop } = useMatchBreakpoints()

  const unlockTimestamp = useTargetUnlockTime(Number(cakeLockWeeks) * WEEK)
  const cakeAmountBN = useMemo(() => getDecimalAmount(new BN(cakeAmount)).toString(), [cakeAmount])
  const veCakeAmountFromNative = useVeCakeAmount(cakeAmountBN, unlockTimestamp)
  const { balance: proxyVeCakeBalance } = useProxyVeCakeBalance()
  const veCakeAmount = useMemo(
    () => proxyVeCakeBalance.plus(veCakeAmountFromNative),
    [proxyVeCakeBalance, veCakeAmountFromNative],
  )

  const veCake = veCakeAmount ? getFullDisplayBalance(new BN(veCakeAmount), 18, 3) : '0'
  const factor =
    veCakeAmountFromNative && veCakeAmountFromNative
      ? `${new BN(veCakeAmountFromNative).div(cakeAmountBN).toPrecision(2)}x`
      : '0x'
  const unlockOn = useMemo(() => formatDate(dayjs.unix(Number(unlockTimestamp))), [unlockTimestamp])

  return (
    <>
      <Text fontSize={12} bold color="secondary" textTransform="uppercase">
        {t('minting overview')}
      </Text>
      <Box padding={['16px 0', '16px 0', 12]}>
        {customVeCakeCard ?? <MyVeCakeCard type="row" value="0" />}

        <AutoRow px={['0px', '0px', '16px']} py={['16px', '16px', '12px']} gap="8px">
          {customDataRow}
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Token Id')}
              </Text>
            }
            value={<ValueText>&bull; 0</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Total Minted')}
              </Text>
            }
            value={<ValueText>&bull; 5</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped DBRO')}
              </Text>
            }
            value={<ValueText>&bull; 500,000</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped Value')}
              </Text>
            }
            value={<ValueText>&bull; $50</ValueText>}
          />
        </AutoRow>
      </Box>
    </>
  )
}
