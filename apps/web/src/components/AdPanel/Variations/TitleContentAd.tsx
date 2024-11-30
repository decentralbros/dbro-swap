import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

export const TitleContentAd = (props: AdPlayerProps) => {
  return (
    <AdCard imageUrl={getImageUrl('ad_clamm_options_trading.png')} {...props}>
      <Title>Need Help?</Title>
      <BodyText>Quick start now on How to Swap!</BodyText>

      <AdButton isExternalLink>Quick start</AdButton>
    </AdCard>
  )
}
