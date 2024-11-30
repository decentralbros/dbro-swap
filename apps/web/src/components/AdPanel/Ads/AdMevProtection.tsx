import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const actionLink = '/mev'

export const AdMevProtection = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_mev.png')} {...props}>
      <BodyText mb="0">{t('Secure your swaps on BNB Chain with MEV guard.')}</BodyText>
      <AdButton mt="16px" href={actionLink} externalIcon>
        {t('Learn More')}
      </AdButton>
    </AdCard>
  )
}
