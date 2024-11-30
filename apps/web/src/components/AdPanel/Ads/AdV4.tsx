import { useTranslation } from '@pancakeswap/localization'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const whitepaperLink =
  'https://github.com/pancakeswap/pancake-v4-core/blob/main/docs/whitepaper-en.pdf?utm_source=homepagebanner&utm_medium=banner&utm_campaign=homepagebanner&utm_id=v4whitepaper'
const learnMoreLink =
  'https://developer.pancakeswap.finance/?utm_source=homepagebanner&utm_medium=banner&utm_campaign=homepagebanner&utm_id=Startbuilding'

export const AdV4 = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_pcs_v4.png')} {...props}>
      <BodyText mb="0">{t('Introducing PancakeSwap v4')}</BodyText>

      <AdButton variant="text" href={whitepaperLink} isExternalLink>
        {t('Read Whitepaper')}
      </AdButton>

      <AdButton mt="4px" href={learnMoreLink} isExternalLink externalIcon>
        {t('Start Building')}
      </AdButton>
    </AdCard>
  )
}
