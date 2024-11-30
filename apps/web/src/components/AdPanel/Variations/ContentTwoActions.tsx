import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const actionLink = 'https://quest.pancakeswap.finance/quests/a2eeefe4f49b4947a1a14bbff344bbb3'
const learnMoreLink =
  'https://blog.pancakeswap.finance/articles/introducing-pancake-swap-quest-beta-your-ultimate-de-fi-quest-platform'

export const ContentTwoActions = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_quests.png')} {...props}>
      <BodyText mb="0">{t('PancakeSwap Quest Beta Now Live!')}</BodyText>

      <AdButton variant="text" href={learnMoreLink} isExternalLink>
        {t('Learn More')}
      </AdButton>

      <AdButton mt="6px" href={actionLink} externalIcon isExternalLink>
        {t('Create Profile')}
      </AdButton>
    </AdCard>
  )
}
