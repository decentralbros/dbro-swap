import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

export const ContentAd = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_clamm_options_trading.png')} {...props}>
      <BodyText fontSize="15px">{t('Web3 Notifications Now Live!')}</BodyText>

      <AdButton mt="20px" variant="text" isExternalLink>
        {t('Learn More')}
      </AdButton>
    </AdCard>
  )
}
