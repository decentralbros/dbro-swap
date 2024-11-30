import { useTranslation } from '@pancakeswap/localization'
import { TelegramIcon } from '@pancakeswap/uikit'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'

import { AdPlayerProps } from '../types'
import { getImageUrl } from '../utils'

const actionLink = 'https://t.me/pancakefi_bot'

export const AdTelegramBot = (props: AdPlayerProps) => {
  const { t } = useTranslation()

  return (
    <AdCard imageUrl={getImageUrl('ad_prediction_telegram_bot.png')} {...props}>
      <BodyText>{t('PancakeSwap Prediction Telegram Bot is now live!')}</BodyText>

      <AdButton mt="4px" href={actionLink} endIcon={<TelegramIcon color="invertedContrast" />} isExternalLink>
        {t('Play Now')}
      </AdButton>
    </AdCard>
  )
}
