import { useTranslation } from '@pancakeswap/localization'
import { Box, Flex, Heading, PageSection, Skeleton } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import { useFetchLottery, useLottery } from 'state/lottery/hooks'
import { styled } from 'styled-components'
import { useReadContract } from 'wagmi'
import deployedContracts from 'config/constants/deployedContracts'
import { ChainId } from '@pancakeswap/chains'
import AllHistoryCard from './components/AllHistoryCard'
import CheckPrizesSection from './components/CheckPrizesSection'
import Countdown from './components/Countdown'
import Hero from './components/Hero'
import HistoryTabMenu from './components/HistoryTabMenu'
import HowToPlay from './components/HowToPlay'
import NextDrawCard from './components/NextDrawCard'
import YourHistoryCard from './components/YourHistoryCard'
import useGetNextLotteryEvent from './hooks/useGetNextLotteryEvent'
import useShowMoreUserHistory from './hooks/useShowMoreUserRounds'
import useStatusTransitions from './hooks/useStatusTransitions'

const LotteryPage = styled.div`
  min-height: calc(100vh - 64px);
`

const LotteryXAG = () => {
  useFetchLottery()
  useStatusTransitions()
  const { t } = useTranslation()
  const { isDark, theme } = useTheme()
  const {
    currentRound: { status, endTime },
  } = useLottery()
  const [historyTabMenuIndex, setHistoryTabMenuIndex] = useState(0)
  const endTimeAsInt = parseInt(endTime, 10)
  const { nextEventTime, postCountdownText, preCountdownText } = useGetNextLotteryEvent(endTimeAsInt, status)
  const { numUserRoundsRequested, handleShowMoreUserRounds } = useShowMoreUserHistory()
  const contractConfig = deployedContracts[84532].DBROLottery

  const { data: lotteryId } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'currentLotteryId',
    chainId: ChainId.BASE_SEPOLIA,
  })

  // Read contract states
  const { data: lotteryStatus } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'status',
    chainId: ChainId.BASE_SEPOLIA,
  })

  return (
    <>
      {lotteryStatus && (
        <LotteryPage>
          <PageSection index={1} position="relative" hasCurvedDivider={false}>
            <Hero lotteryStatus={Number(lotteryStatus)} />
          </PageSection>
          <PageSection
            position="relative"
            innerProps={{ style: { margin: '-30px', width: '100%' } }}
            index={2}
            hasCurvedDivider={false}
          >
            <Flex width="100%" alignItems="center" justifyContent="center" flexDirection="column" pt="24px">
              <Heading scale="xl" mb="24px" textAlign="center">
                {t('Are you a winner?')}
              </Heading>

              <CheckPrizesSection />

              <Flex alignItems="center" justifyContent="center" mb="48px">
                {nextEventTime && (postCountdownText || preCountdownText) ? (
                  <Countdown
                    nextEventTime={nextEventTime}
                    postCountdownText={postCountdownText}
                    preCountdownText={preCountdownText}
                  />
                ) : (
                  <Skeleton height="41px" width="250px" />
                )}
              </Flex>

              <NextDrawCard lotteryStatus={Number(lotteryStatus)} />
            </Flex>
          </PageSection>
          <PageSection
            position="relative"
            innerProps={{ style: { margin: '0', width: '100%' } }}
            index={2}
            hasCurvedDivider={false}
          >
            <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
              <Heading mb="24px" scale="xl">
                {t('Finished Rounds')}
              </Heading>
              <Box mb="24px">
                <HistoryTabMenu
                  activeIndex={historyTabMenuIndex}
                  setActiveIndex={(index) => setHistoryTabMenuIndex(index)}
                />
              </Box>
              {historyTabMenuIndex === 0 ? (
                <AllHistoryCard />
              ) : (
                <YourHistoryCard
                  handleShowMoreClick={handleShowMoreUserRounds}
                  numUserRoundsRequested={numUserRoundsRequested}
                />
              )}
            </Flex>
          </PageSection>
          <PageSection
            dividerPosition="top"
            dividerFill={{ light: theme.colors.background }}
            index={2}
            hasCurvedDivider={false}
          >
            <HowToPlay />
          </PageSection>
        </LotteryPage>
      )}
    </>
  )
}

export default LotteryXAG
