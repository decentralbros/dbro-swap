import { Box, FlexGap, Link, Text } from '@pancakeswap/uikit'
import { getImageUrl } from 'components/AdPanel/utils'
import { styled } from 'styled-components'
import { FAQConfig } from '../types'

export const StyledFlex = styled(FlexGap)`
  display: inline-flex;
  &::before {
    content: '';
    position: relative;
    height: 6px;
    width: 6px;
    margin-right: 15px;
    margin-top: 9px;
    background-color: ${({ theme }) => theme.colors.text};
    border-radius: 50%;
  }
`

export const swapFAQConfig: FAQConfig = (t) => ({
  title: t('Quick start now on How to Swap!'),
  subtitle: t('Need Help?'),
  imageUrl: getImageUrl('faq_bunny.png'),
  alt: 'FAQ bunny',
  docsUrl: 'https://docs.pancakeswap.finance/products/pancakeswap-exchange',
  data: [
    {
      title: t('How to Swap?'),
      content: (
        <ul style={{ overflow: 'auto', height: '' }}>
          <li>
            {t('Connect your wallet and ensure there are sufficient tokens in your wallet for swapping and gas fee.')}
          </li>
          <li>{t('Select the token you want to sell, and the token you want to receive.')}</li>
          <li>{t('Enter the amount and click “Swap”.')}</li>
          <li>{t('Review all the details and click “Confirm Swap”, then confirm in your wallet.')}</li>
        </ul>
      ),
    },
    {
      title: t('Where to get Crypto?'),
      content: (
        <Box>
          {t('To get Crypto for swaps and gas fee:')}
          <ul style={{ overflow: 'auto' }}>
            <StyledFlex flexWrap="wrap" flexGrow={0}>
              {t('Use the')}
              <Link m="0 5px" href="https://pancakeswap.finance/buy-crypto" color="primary">
                {t('Buy Crypto')}
              </Link>
              {t('feature to buy.')}
            </StyledFlex>
            <StyledFlex flexWrap="wrap" flexGrow={0}>
              <Link m="0 5px" href="https://bridge.pancakeswap.finance">
                {t('Bridge your assets')}
              </Link>
              <Text>{t('from other blockchains.')}</Text>
            </StyledFlex>
          </ul>
        </Box>
      ),
    },
    {
      title: t('What is slippage %?'),
      content: (
        <Box>
          <Text>
            {t(
              'Slippage % controls the gap between the expected receiving amount and the minimum guaranteed amount of a swap. High volatility may require adjusting slippage tolerance in settings to successfully complete a swap.',
            )}
          </Text>
          <Text>{t('Always check “minimum receive” section for the guaranteed receiving amount of a swap.')}</Text>
        </Box>
      ),
    },
    {
      title: t('Why is my transaction failing?'),
      content: (
        <Box>
          <ul style={{ overflow: 'auto' }}>
            <li>{t('Increase your slippage while trading volatile assets.')}</li>
            <li>{t('Check if you have enough token in your wallet to pay the gas fee.')}</li>
            <li>{t('When trading fee-on-Transfer tokens, increase slippage % over the transfer fee.')}</li>
            <li>{t('Some scam tokens may have a block on all transfers or swaps on chain.')}</li>
          </ul>

          <FlexGap gap="5px" flexGrow={0}>
            {t('For more details,')}{' '}
            <Link
              href="https://docs.pancakeswap.finance/products/pancakeswap-exchange/faq"
              style={{ textDecoration: 'underline' }}
            >
              {t('read here.')}
            </Link>
          </FlexGap>
        </Box>
      ),
    },
    {
      title: t('Try out Limit Orders'),
      content: t(
        'Limit orders allow you to set a specific price at which you want to swap tokens. This can help you avoid slippage and ensure you get the desired rate for your trade.',
      ),
    },
    {
      title: t('Stay safe'),
      content: t(
        'Always double-check the token contract addresses against trusted sources before swapping to avoid scams. Pay attention to the token risk scanning if appeared.',
      ),
    },
  ],
})
