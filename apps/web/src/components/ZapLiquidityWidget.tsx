import '@kyberswap/pancake-liquidity-widgets/dist/style.css'
import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/sdk'
import { Flex, InfoFilledIcon, Message, MessageText, ModalContainer, ModalV2, useToast } from '@pancakeswap/uikit'
import { Pool } from '@pancakeswap/v3-sdk'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useTheme } from 'styled-components'
import { getAddress } from 'viem'
import { useWalletClient } from 'wagmi'
import { isAddressEqual } from 'utils'
import WalletModalManager from 'components/WalletModalManager'
import { useMasterchefV3 } from 'hooks/useContract'

interface ZapLiquidityProps {
  tickLower?: number
  tickUpper?: number
  pool?: Pool | null
  tokenId?: string | null
  baseCurrency?: Currency | null
  baseCurrencyAmount?: string | null
  quoteCurrency?: Currency | null
  quoteCurrencyAmount?: string | null
  onSubmit?: () => void
}

const LiquidityWidget = dynamic(
  () => import('@kyberswap/pancake-liquidity-widgets').then((mod) => mod.LiquidityWidget),
  { ssr: false },
)

const NATIVE_CURRENCY_ADDRESS = getAddress('0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')

const getCurrencyAddress = (currency: Currency | undefined | null): string =>
  currency?.isNative ? NATIVE_CURRENCY_ADDRESS : currency?.wrapped?.address || ''

export const ZapLiquidityWidget: React.FC<ZapLiquidityProps> = ({
  tickLower,
  tickUpper,
  tokenId,
  pool,
  baseCurrency,
  baseCurrencyAmount,
  quoteCurrency,
  quoteCurrencyAmount,
  onSubmit,
}) => {
  const { t } = useTranslation()

  const { isDark } = useTheme()

  const { account, chainId } = useActiveWeb3React()

  const { data: walletClient } = useWalletClient()

  const addTransaction = useTransactionAdder()

  const { toastSuccess } = useToast()

  const poolAddress = useMemo(() => pool && Pool.getAddress(pool.token0, pool.token1, pool.fee), [pool])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const [depositTokens, setDepositTokens] = useState<string>('')

  const [amounts, setAmounts] = useState<string>('')

  const handleWalletModalOnDismiss = useCallback(() => setIsWalletModalOpen(false), [])

  const handleOnWalletConnect = useCallback(() => setIsWalletModalOpen(true), [])

  const masterChefV3 = useMasterchefV3()

  const masterChefV3Addresses = useMemo(() => (masterChefV3 ? [masterChefV3.address] : undefined), [masterChefV3])

  const handleOnClick = useCallback(() => {
    setDepositTokens(
      [
        baseCurrencyAmount && baseCurrencyAmount !== '0' ? getCurrencyAddress(baseCurrency) : '',
        quoteCurrencyAmount && quoteCurrencyAmount !== '0' ? getCurrencyAddress(quoteCurrency) : '',
      ]
        .filter(Boolean)
        .join(','),
    )
    setAmounts(
      [
        baseCurrencyAmount && baseCurrencyAmount !== '0' ? baseCurrencyAmount : '',
        quoteCurrencyAmount && quoteCurrencyAmount !== '0' ? quoteCurrencyAmount : '',
      ]
        .filter(Boolean)
        .join(','),
    )
    setIsModalOpen(true)
  }, [baseCurrency, quoteCurrency, baseCurrencyAmount, quoteCurrencyAmount])

  const handleOnDismiss = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleTransaction = useCallback(
    (txHash: string) => {
      toastSuccess(`${t('Transaction Submitted')}!`, <ToastDescriptionWithTx txHash={txHash} />)
      addTransaction(
        { hash: txHash },
        {
          type: 'zap-liquidity-v3',
          summary: `Zap in for ${baseCurrency?.symbol} - ${quoteCurrency?.symbol}`,
          translatableSummary: {
            text: 'Zap in for %lpSymbol%',
            data: { lpSymbol: `${baseCurrency?.symbol} - ${quoteCurrency?.symbol}` },
          },
        },
      )
      setIsModalOpen(false)
      onSubmit?.()
    },
    [addTransaction, baseCurrency?.symbol, quoteCurrency?.symbol, t, toastSuccess, onSubmit],
  )

  const handleSelectToken = useCallback(
    (token: Currency) => {
      const selectedTokenAddress = getCurrencyAddress(token)
      const indexOfToken = depositTokens
        .split(',')
        .findIndex((depositToken) => isAddressEqual(depositToken, selectedTokenAddress))

      if (indexOfToken > -1) return
      setDepositTokens(depositTokens ? `${depositTokens},${selectedTokenAddress}` : `${selectedTokenAddress}`)
      setAmounts(amounts ? `${amounts},` : '')
    },
    [depositTokens, amounts],
  )

  const handleAmountChange = useCallback(
    (tokenAddress: string, amount: string) => {
      const indexOfToken = depositTokens
        .split(',')
        .findIndex((depositToken) => isAddressEqual(depositToken, tokenAddress))
      if (indexOfToken === -1) return

      const amountList = amounts.split(',')
      amountList[indexOfToken] = amount
      setAmounts(amountList.join(','))
    },
    [amounts, depositTokens],
  )

  const handleAddTokens = useCallback(
    (tokenAddresses: string) => {
      setDepositTokens(depositTokens ? `${depositTokens},${tokenAddresses}` : tokenAddresses)
      const amountsToAdd = tokenAddresses
        .split('')
        .filter((item) => item === ',')
        .join('')
      setAmounts(amounts ? `${amounts},${amountsToAdd}` : amountsToAdd)
    },
    [amounts, depositTokens],
  )

  const handleRemoveToken = useCallback(
    (tokenAddress: string) => {
      const tokens = depositTokens.split(',')
      const indexOfToken = tokens.findIndex((depositToken) => isAddressEqual(depositToken, tokenAddress))
      if (indexOfToken === -1) return

      tokens.splice(indexOfToken, 1)
      setDepositTokens(tokens.join(','))
      const amountList = amounts.split(',')
      amountList.splice(indexOfToken, 1)
      setAmounts(amountList.join(','))
    },
    [amounts, depositTokens],
  )

  return (
    <>
      <Message variant="primary" padding="8px" icon={<InfoFilledIcon color="secondary" />}>
        <Flex flexDirection="column" style={{ gap: 8 }}>
          <MessageText lineHeight="120%" fontSize={16}>
            {t('Try Zap to automatically balance and provide V3 liquidity in one click.')}
          </MessageText>
          <span
            onClick={handleOnClick}
            role="presentation"
            style={{ whiteSpace: 'nowrap', textDecoration: 'underline', cursor: 'pointer' }}
            data-dd-action-name="Zap V3 Liquidity"
          >
            <MessageText fontWeight={600} fontSize={16}>
              {t('Click here to start')} {'>>'}
            </MessageText>
          </span>
        </Flex>
      </Message>
      <WalletModalManager isOpen={isWalletModalOpen} onDismiss={handleWalletModalOnDismiss} />
      <ModalV2 closeOnOverlayClick isOpen={isModalOpen} onDismiss={handleOnDismiss}>
        <ModalContainer style={{ maxHeight: '90vh', overflow: 'auto' }}>
          <LiquidityWidget
            theme={isDark ? 'dark' : 'light'}
            feeAddress="0xB82bb6Ce9A249076Ca7135470e7CA634806De168"
            feePcm={0}
            walletClient={walletClient}
            account={account ?? undefined}
            networkChainId={chainId}
            chainId={chainId}
            initTickLower={tickLower ? +tickLower : undefined}
            initTickUpper={tickUpper ? +tickUpper : undefined}
            positionId={tokenId || undefined}
            initAmounts={amounts}
            initDepositTokens={depositTokens}
            poolAddress={poolAddress ?? '0x'}
            farmContractAddresses={masterChefV3Addresses}
            onConnectWallet={handleOnWalletConnect}
            onAddTokens={handleAddTokens}
            onOpenTokenSelectModal={() => {}}
            onRemoveToken={handleRemoveToken}
            onAmountChange={handleAmountChange}
            onDismiss={handleOnDismiss}
            onTxSubmit={handleTransaction}
            source="pancakeswap"
          />
        </ModalContainer>
      </ModalV2>
    </>
  )
}
