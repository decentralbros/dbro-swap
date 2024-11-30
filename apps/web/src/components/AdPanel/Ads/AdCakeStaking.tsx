import { useTranslation } from '@pancakeswap/localization'
import { useFourYearTotalVeCakeApr } from 'views/CakeStaking/hooks/useAPR'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { BodyText } from '../BodyText'
import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const actionLink = 'https://docs.pancakeswap.finance/products/vecake'

export const AdCakeStaking = (props: AdPlayerProps) => {
  const { t } = useTranslation()
  const { totalApr } = useFourYearTotalVeCakeApr()

  return (
    <AdCard imageUrl={getImageUrl('ad_cake_staking.png')} {...props}>
      <BodyText mb="0">
        {t('Stake CAKE and Earn up to %apr%% APR !', {
          apr: totalApr.toFixed(2),
        })}
      </BodyText>

      <AdButton variant="text" href={actionLink} isExternalLink>
        {t('Learn More')}
      </AdButton>

      <AdButton mt="4px" href="/cake-staking" chevronRightIcon>
        {t('Stake CAKE')}
      </AdButton>
    </AdCard>
  )
}
