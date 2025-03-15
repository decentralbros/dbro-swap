import { useTranslation } from '@pancakeswap/localization'
import {
  BinanceChainIcon,
  Button,
  ButtonProps,
  CoinbaseWalletIcon,
  Flex,
  MetamaskIcon,
  OperaIcon,
  TokenPocketIcon,
  TooltipOptions,
  TrustWalletIcon,
  useTooltip,
} from '@pancakeswap/uikit'
import { useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { checkWalletCanRegisterToken } from 'utils/wallet'
import { Address } from 'viem'
import { watchAsset } from 'viem/actions'
import { useAccount, useWalletClient } from 'wagmi'
import { BAD_SRCS } from '../Logo/constants'

export enum AddToWalletTextOptions {
  NO_TEXT,
  TEXT,
  TEXT_WITH_ASSET,
}

export interface AddToWalletButtonProps {
  tokenAddress?: string
  tokenSymbol?: string
  tokenDecimals?: number
  tokenLogo?: string
  textOptions?: AddToWalletTextOptions
  marginTextBetweenLogo?: string
  tooltipPlacement?: TooltipOptions['placement']
}

const Icons = {
  // TODO: Brave
  Binance: BinanceChainIcon,
  'Coinbase Wallet': CoinbaseWalletIcon,
  Opera: OperaIcon,
  TokenPocket: TokenPocketIcon,
  'Trust Wallet': TrustWalletIcon,
  MetaMask: MetamaskIcon,
}

const getWalletText = (textOptions: AddToWalletTextOptions, tokenSymbol: string | undefined, t: any) => {
  return (
    textOptions !== AddToWalletTextOptions.NO_TEXT &&
    (textOptions === AddToWalletTextOptions.TEXT
      ? t('Add to Wallet')
      : t('Add %asset% to Wallet', { asset: tokenSymbol }))
  )
}

const useWalletIcon = (marginTextBetweenLogo: string, enabled = false) => {
  const { connector } = useAccount()
  return useQuery({
    queryKey: ['walletIcon', connector?.uid],
    queryFn: async () => {
      if (!connector) {
        return undefined
      }

      const name = connector?.name

      const iconProps = {
        width: '16px',
        ...(marginTextBetweenLogo && { ml: marginTextBetweenLogo }),
      }

      if (name && Icons[name]) {
        const Icon = Icons[name]
        return <Icon {...iconProps} />
      }

      try {
        if (typeof connector.getProvider !== 'function') {
          return undefined
        }

        const provider = (await connector.getProvider()) as any

        if (provider.isTrust) {
          return <TrustWalletIcon {...iconProps} />
        }
        if (provider.isCoinbaseWallet) {
          return <CoinbaseWalletIcon {...iconProps} />
        }
        if (provider.isTokenPocket) {
          return <TokenPocketIcon {...iconProps} />
        }
        return <MetamaskIcon {...iconProps} />
      } catch (error) {
        console.error('Error fetching provider for wallet icon', error)
      }
      return undefined
    },
    enabled: Boolean(enabled && connector),
    staleTime: Infinity,
    retry: false,
  })
}

const useWalletCanRegisterToken = () => {
  const { connector } = useAccount()
  const { data } = useQuery({
    queryKey: ['walletSupportsTokenRegistration', connector?.uid],
    queryFn: () => checkWalletCanRegisterToken(connector!),
    enabled: Boolean(connector),
    retry: false,
  })

  return { isCanRegisterToken: data ?? false }
}

const AddToWalletButton: React.FC<AddToWalletButtonProps & ButtonProps> = ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenLogo,
  textOptions = AddToWalletTextOptions.NO_TEXT,
  marginTextBetweenLogo = '0px',
  tooltipPlacement = 'auto',
  ml,
  mr,
  ...props
}) => {
  const { t } = useTranslation()
  const { connector, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const { isCanRegisterToken } = useWalletCanRegisterToken()
  const { data: walletIcon } = useWalletIcon(marginTextBetweenLogo, isCanRegisterToken)

  const { targetRef, tooltipVisible, tooltip } = useTooltip(t('Add to your wallet'), {
    placement: tooltipPlacement,
    avoidToStopPropagation: true,
  })

  const handleOnClick = useCallback(async () => {
    const image = tokenLogo ? (BAD_SRCS[tokenLogo] ? undefined : tokenLogo) : undefined
    if (!walletClient || !tokenAddress || !tokenSymbol || !tokenDecimals) return
    try {
      await watchAsset(walletClient, {
        // TODO: Add more types
        type: 'ERC20',
        options: {
          address: tokenAddress as Address,
          symbol: tokenSymbol,
          image,
          decimals: tokenDecimals,
        },
      })
    } catch (error) {
      console.error('Error watchAsset', error)
    }
  }, [tokenLogo, walletClient, tokenAddress, tokenSymbol, tokenDecimals])

  if (!walletClient) return null
  if (connector && connector.name === 'Binance') return null
  if (!(connector && isConnected)) return null
  if (!isCanRegisterToken) return null

  return (
    <>
      <Flex alignItems="center" justifyContent="center" ref={targetRef} ml={ml} mr={mr}>
        <Button {...props} title={t('Add to your wallet')} onClick={handleOnClick}>
          {getWalletText(textOptions, tokenSymbol, t)}
          {walletIcon}
        </Button>
      </Flex>
      {tooltipVisible && tooltip}
    </>
  )
}

export default AddToWalletButton
