import { useTranslation } from '@pancakeswap/localization'
import { Text } from '@pancakeswap/uikit'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const learnMoreLink =
  'https://blog.pancakeswap.finance/articles/introducing-pancake-swap-x-zero-fee-and-gasless-swaps-on-ethereum-and-arbitrum?utm_source=Website&utm_medium=homepage&utm_campaign=PCSX&utm_id=PCSX'
const actionLink = '/swap?utm_source=Website&utm_medium=homepage&utm_campaign=PCSX&utm_id=PCSX'

export const AdPCSX = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_pcsx.png')} {...props}>
      <BodyText mb="0">
        <Text as="span" color="secondary" bold>
          {t('ZERO')}
        </Text>{' '}
        {t('Fee Swaps on Ethereum & Arbitrum')}
      </BodyText>

      <AdButton variant="text" href={learnMoreLink} isExternalLink>
        {t('Learn More')}
      </AdButton>

      <AdButton mt="4px" href={actionLink} chevronRightIcon>
        {t('Swap Now!')}
      </AdButton>
    </AdCard>
  )
}
