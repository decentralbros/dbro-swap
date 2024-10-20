import { languageList, useTranslation } from '@pancakeswap/localization'
import { Text, Menu as UikitMenu, footerLinks, useModal } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'
import USCitizenConfirmModal from 'components/Modal/USCitizenConfirmModal'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePerpUrl } from 'hooks/usePerpUrl'
import useTheme from 'hooks/useTheme'
import { IdType, useUserNotUsCitizenAcknowledgement } from 'hooks/useUserIsUsCitizenAcknowledgement'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { getOptionsUrl } from 'utils/getOptionsUrl'
import UserMenu from './UserMenu'
import { UseMenuItemsParams, useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'

const LinkComponent = (linkProps) => {
  return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
}

const Menu = (props) => {
  const { chainId } = useActiveChainId()
  const { isDark, setTheme } = useTheme()
  // const cakePrice = useCakePrice()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const perpUrl = usePerpUrl({ chainId, isDark, languageCode: currentLanguage.code })
  const [perpConfirmed] = useUserNotUsCitizenAcknowledgement(IdType.PERPETUALS)
  const [optionsConfirmed] = useUserNotUsCitizenAcknowledgement(IdType.OPTIONS)

  const [onPerpConfirmModalPresent] = useModal(
    <USCitizenConfirmModal title={t('PancakeSwap Perpetuals')} id={IdType.PERPETUALS} href={perpUrl} />,
    true,
    false,
    'perpConfirmModal',
  )
  const [onOptionsConfirmModalPresent] = useModal(
    <USCitizenConfirmModal
      title={t('PancakeSwap Options')}
      id={IdType.OPTIONS}
      href={getOptionsUrl()}
      desc={
        <Text mt="0.5rem">
          {t(
            'Please note that you are being redirected to an externally hosted website associated with our partner Stryke (formerly Dopex).',
          )}
        </Text>
      }
    />,
    true,
    false,
    'optionsConfirmModal',
  )
  const onSubMenuClick = useCallback<NonNullable<UseMenuItemsParams['onClick']>>(
    (e, item) => {
      const preventRedirect = () => {
        e.preventDefault()
        e.stopPropagation()
      }
      if (item.confirmModalId === 'perpConfirmModal' && !perpConfirmed) {
        preventRedirect()
        onPerpConfirmModalPresent()
        return
      }
      if (item.confirmModalId === 'optionsConfirmModal' && !optionsConfirmed) {
        preventRedirect()
        onOptionsConfirmModalPresent()
      }
    },
    [perpConfirmed, optionsConfirmed, onPerpConfirmModalPresent, onOptionsConfirmModalPresent],
  )
  // const [showPhishingWarningBanner] = usePhishingBanner()

  const menuItems = useMenuItems({
    onClick: onSubMenuClick,
  })

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <>
      <UikitMenu
        linkComponent={LinkComponent}
        rightSide={
          <>
            {/* <GlobalSettings mode={SettingsMode.GLOBAL} /> */}
            <NetworkSwitcher />
            <UserMenu />
          </>
        }
        chainId={chainId}
        banner={false}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={undefined}
        links={menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={getFooterLinks}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Trade')}
        buyCakeLink="https://decentralbros.finance"
        {...props}
      />
    </>
  )
}

export default Menu
