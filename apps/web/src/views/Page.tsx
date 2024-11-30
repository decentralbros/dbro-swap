import { Swap } from '@pancakeswap/widgets-internal'
import { EXCHANGE_HELP_URLS } from 'config/constants'

const Page: React.FC<
  React.PropsWithChildren<{
    removePadding?: boolean
    hideFooterOnDesktop?: boolean
    noMinHeight?: boolean
    helpUrl?: string
    showExternalLink?: boolean
    showHelpLink?: boolean
    style?: React.CSSProperties
  }>
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_HELP_URLS,
  showExternalLink = true,
  showHelpLink = true,
  ...props
}) => {
  const externalText = ''
  const externalLinkUrl = ''

  return (
    <Swap.Page
      removePadding={removePadding}
      noMinHeight={noMinHeight}
      hideFooterOnDesktop={hideFooterOnDesktop}
      helpUrl={showHelpLink ? helpUrl : undefined}
      externalText={externalText}
      externalLinkUrl={showExternalLink ? externalLinkUrl : undefined}
      {...props}
    >
      {children}
    </Swap.Page>
  )
}

export default Page

export const PageWithoutFAQ = Page
PageWithoutFAQ.defaultProps = { showHelpLink: false, showExternalLink: false }
