import { useTranslation } from '@pancakeswap/localization'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { BodyText } from '../BodyText'
import { AdButton } from '../Button'
import { AdCard } from '../Card'
import { FAQ } from '../FAQ'
import { faqTypeByPage } from '../FAQ/config'
import { useFaqConfig } from '../FAQ/useFaqConfig'
import { Title } from '../Title'
import { AdPlayerProps } from '../types'
import { ExpandableActions } from './ExpandableActions'
import { ExpandableContent } from './ExpandableContent'
import { ExpandableModal } from './ExpandableModal'
import { useExpandableCard } from './useExpandableCard'

const ExpandedContent: React.FC = () => {
  const router = useRouter()
  return <FAQ type={faqTypeByPage[router.pathname]} />
}

export const ExpandableAd = (props: AdPlayerProps) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  const { actionPanelRef, adCardRef, extendedContentRef, handleDismiss, handleExpand, isOpen, isExpanded } =
    useExpandableCard({
      adId: 'expandable-ad',
      forceMobile: props.forceMobile,
    })

  const { title, subtitle, imageUrl, docsUrl } = useFaqConfig()(t)

  const actionButton = (
    <AdButton href={docsUrl} externalIcon isExternalLink>
      {t('View Details in Docs')}
    </AdButton>
  )

  return (
    <AdCard
      imageUrl={imageUrl}
      isExpanded={isExpanded}
      {...props}
      ref={adCardRef}
      style={{ maxHeight: isMobile ? '500px' : '700px' }}
    >
      <Flex flexDirection="column" justifyContent="space-between" height="100%" flexGrow={0}>
        <ExpandableContent
          title={title}
          isExpanded={isExpanded}
          extendedContentRef={extendedContentRef}
          expandableContent={<ExpandedContent />}
          defaultContent={
            <>
              <Title>{subtitle}</Title>
              <BodyText>{title}</BodyText>
            </>
          }
        />
        <ExpandableActions
          isExpanded={isExpanded}
          actionPanelRef={actionPanelRef}
          actionButton={actionButton}
          handleDismiss={handleDismiss}
          handleExpand={handleExpand}
        />
      </Flex>

      {/* On Non-Desktop devices, show expanded content in modal */}
      <ExpandableModal
        title={title}
        isOpen={isOpen}
        onDismiss={handleDismiss}
        expandableContent={<ExpandedContent />}
        actionButton={actionButton}
      />
    </AdCard>
  )
}
