import { ArrowForwardIcon, Box, Button, Flex, Grid, Heading, Text } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'
import styled, { css } from 'styled-components'

export const PageHead = () => {
  return (
    <Flex justifyContent="space-between" flexDirection="row">
      <Flex flex="1" flexDirection="column" mr={[0, 0, '8px']}>
        <Header />
        <Description />
        <NextLinkFromReactRouter
          to="/swap?chain=base&outputCurrency=0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F"
          prefetch={false}
        >
          <Button p="0" variant="text" mt="4px" mb="24px">
            <Text color="primary" bold fontSize="16px" mr="4px">
              Buy DBRO
            </Text>
            <ArrowForwardIcon color="primary" />
          </Button>
        </NextLinkFromReactRouter>
      </Flex>
    </Flex>
  )
}

const Header = () => {
  return (
    <Flex alignItems="baseline" justifyContent="space-between" flexDirection="column">
      <Heading mb="24px" scale="xl" color="secondary">
        Trending Tokens!
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
  return (
    <Grid justifyContent="space-between" gridTemplateColumns="1fr">
      <DescriptionContent fullSize={false}>
        <Text color="textSubtle" lineHeight="120%">
          The most recently bought tokens on DBRO Swap by volume.
        </Text>
      </DescriptionContent>
    </Grid>
  )
}
