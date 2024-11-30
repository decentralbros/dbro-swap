import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const actionLink = 'https://four.meme/'

export const AdRocker = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_rocker_meme_career.png')} {...props}>
      <BodyText>{t('Rocker launching your meme career')}</BodyText>

      <AdButton mt="20px" href={actionLink} externalIcon isExternalLink>
        {t('Learn More')}
      </AdButton>
    </AdCard>
  )
}
