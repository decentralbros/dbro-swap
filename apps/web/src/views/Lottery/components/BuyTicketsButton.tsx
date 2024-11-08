import { useTheme } from '@pancakeswap/hooks'
import { useTranslation } from '@pancakeswap/localization'
import { Button, ButtonProps, useModal } from '@pancakeswap/uikit'
import { useLottery } from 'state/lottery/hooks'
import BuyTicketsModal from './BuyTicketsModal/BuyTicketsModal'

interface BuyTicketsButtonProps extends ButtonProps {
  disabled?: boolean
  themeMode?: string
}

const BuyTicketsButton: React.FC<React.PropsWithChildren<BuyTicketsButtonProps>> = ({
  disabled,
  themeMode,
  ...props
}) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const [onPresentBuyTicketsModal] = useModal(<BuyTicketsModal />)
  const {
    currentRound: { status },
  } = useLottery()

  const getBuyButtonText = () => {
    return t('Buy Tickets!')
  }

  const themeStr = themeMode ?? (isDark ? 'dark' : 'light')

  return (
    <Button data-theme={themeStr} {...props} disabled={disabled} onClick={onPresentBuyTicketsModal}>
      {getBuyButtonText()}
    </Button>
  )
}

export default BuyTicketsButton
