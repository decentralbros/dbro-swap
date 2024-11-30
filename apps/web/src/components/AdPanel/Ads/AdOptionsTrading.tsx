import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const learnMoreLink =
  'https://blog.pancakeswap.finance/articles/introducing-clamm-options-trading-on-pancake-swap-in-collaboration-with-stryke-formerly-dopex'

const actionLink = 'https://pancakeswap.stryke.xyz'

export const AdOptionsTrading = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_clamm_options_trading.png')} {...props}>
      <BodyText mb="0">{t('Introducing CLAMM Options Trading.')}</BodyText>

      <AdButton variant="text" href={learnMoreLink} isExternalLink>
        {t('Learn More')}
      </AdButton>

      <AdButton mt="4px" href={actionLink} chevronRightIcon isExternalLink>
        {t('Try it now')}
      </AdButton>
    </AdCard>
  )
}
