import { useTranslation } from '@pancakeswap/localization'
import { ArrowForwardIcon, Box, Button, Flex, Grid, Text, Heading } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'
import { useMemo } from 'react'
import styled, { css } from 'styled-components'
import { useCakeLockStatus } from '../hooks/useVeCakeUserInfo'
import { CakeLockStatus } from '../types'

export const PageHead = () => {
  const { t } = useTranslation()

  return (
    <Flex justifyContent="space-between" flexDirection="row">
      <Flex flex="1" flexDirection="column" mr={[0, 0, '8px']}>
        <Header />
        <Description />
        <NextLinkFromReactRouter
          to="/swap?chain=base&outputCurrency=0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F"
          prefetch={false}
        >
          <Button p="0" variant="text" mt="4px">
            <Text color="primary" bold fontSize="16px" mr="4px">
              {t('Buy DBRO')}
            </Text>
            <ArrowForwardIcon color="primary" />
          </Button>
        </NextLinkFromReactRouter>
      </Flex>

      {/* <Box>
        <HeadBunny />
      </Box> */}
    </Flex>
  )
}

const Header = () => {
  const { t } = useTranslation()
  const { status } = useCakeLockStatus()
  const staking = useMemo(() => status === CakeLockStatus.Locking, [status])

  return (
    <Flex alignItems="baseline" justifyContent={staking ? 'space-between' : undefined} flexDirection="column">
      <Heading mb="24px" scale="xl" color="secondary">
        {t('Mint & Wrap DBRO!')}
      </Heading>
    </Flex>
  )
}

const DescriptionContent = styled(Box).withConfig({
  shouldForwardProp: (props) => props !== 'fullSize',
})<{
  fullSize?: boolean
}>`
  max-width: 196px;

  @media screen and (min-width: 360px) {
    max-width: 243px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 537px;
  }

  ${({ fullSize }) =>
    fullSize
      ? css`
          max-width: 100% !important;
        `
      : null}
`

const Description = () => {
  const { t } = useTranslation()
  const { status } = useCakeLockStatus()
  const staking = useMemo(() => status === CakeLockStatus.Locking, [status])
  return (
    <Grid justifyContent="space-between" gridTemplateColumns={staking ? '1fr' : ['4fr 1fr', '4fr 1fr', '1fr']}>
      <DescriptionContent fullSize={staking}>
        <Text color="textSubtle" lineHeight="120%">
          {t('Enjoy the benefits of DBRO utilities including reduced custom development fees, workshops, and more!')}
        </Text>
      </DescriptionContent>
      {/* {isMobile && !staking ? <MobileHeadBunny /> : null} */}
    </Grid>
  )
}
