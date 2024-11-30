import { useCountdown } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { Box, BoxProps } from '@pancakeswap/uikit'
import styled from 'styled-components'

const CountDownWrapper = styled(Box)`
  font-size: 16px;

  font-style: normal;
  font-family: Kanit;
  font-weight: 600;

  line-height: 90%;

  border-radius: 12px;

  flex-direction: column;
  width: max-content;

  padding: 5px 8px 5px 8px;

  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);

  ${({ theme }) => theme.mediaQueries.sm} {
    line-height: 110%; /* 22px */
  }
`

interface CountdownProps extends BoxProps {
  targetTime: number

  subtleColor?: string
}

export const Countdown: React.FC<CountdownProps> = ({ targetTime, subtleColor, ...props }) => {
  const { t } = useTranslation()

  const countdown = useCountdown(targetTime)
  if (!countdown) {
    return null
  }
  const hours = countdown?.hours < 10 ? `0${countdown?.hours}` : countdown?.hours
  const minutes = countdown?.minutes < 10 ? `0${countdown?.minutes}` : countdown?.minutes
  const days = countdown?.days < 10 ? `0${countdown?.days}` : countdown?.days

  const SubtleText = styled.span`
    color: ${subtleColor};
  `

  return (
    <CountDownWrapper {...props}>
      {days}
      <SubtleText>{t('d')} : </SubtleText>
      {hours}
      <SubtleText>{t('h')} : </SubtleText>
      {minutes}
      <SubtleText>{t('m')}</SubtleText>
    </CountDownWrapper>
  )
}
