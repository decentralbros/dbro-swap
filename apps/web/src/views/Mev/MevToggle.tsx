import { useTranslation } from '@pancakeswap/localization'
import {
  Box,
  Button,
  FlexGap,
  InjectedModalProps,
  ModalBody,
  ModalCloseButton,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalV2,
  ShieldIcon,
  Text,
  Toggle,
  useModalV2,
  useTooltip,
} from '@pancakeswap/uikit'

import { styled } from 'styled-components'
import { AddMevRpcButton } from './AddMevRpcButton'
import { useIsMEVEnabled, useShouldShowMEVToggle } from './hooks'
import { getImageUrl } from './utils'

export const ToggleWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background-color: ${({ theme }) => theme.colors.tertiary};
  padding: 16px;
  display: flex;
  width: 100%;
  gap: 4px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
`
export const ModalImg = styled.img`
  width: 258px;
`

export const MevToggle: React.FC = () => {
  const { t } = useTranslation()
  const shouldShowMEVToggle = useShouldShowMEVToggle()
  const { isMEVEnabled } = useIsMEVEnabled()
  const { isOpen, onOpen, onDismiss } = useModalV2()
  const { tooltip, tooltipVisible, targetRef } = useTooltip(
    t('PancakeSwap MEV Guard protects you from frontrunning and sandwich attacks when Swapping.'),
    {
      placement: 'auto',
      trigger: 'hover',
    },
  )

  if (!shouldShowMEVToggle) {
    return null
  }

  return (
    <>
      <ToggleWrapper>
        <FlexGap gap="4px">
          <ShieldIcon width="24px" />
          <Text>{t('Enable')}</Text>
          <Text
            ref={targetRef}
            style={{ textDecoration: 'underline', textDecorationStyle: 'dotted', cursor: 'pointer' }}
          >
            {t('MEV Protect')}
          </Text>
          {tooltipVisible && tooltip}
        </FlexGap>
        <Toggle scale="md" checked={isMEVEnabled} onClick={onOpen} />
      </ToggleWrapper>
      <MevModal isOpen={isOpen} onDismiss={onDismiss} />
    </>
  )
}

export const MevModal: React.FC<{ isOpen: boolean; onSuccess?: () => void } & InjectedModalProps> = ({
  isOpen,
  onDismiss,
}) => {
  const { t } = useTranslation()

  return (
    <ModalV2 isOpen={isOpen} onDismiss={onDismiss} closeOnOverlayClick>
      <ModalContainer>
        <ModalHeader style={{ border: 'none', position: 'relative' }}>
          <ModalTitle />
          <Text
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            width="100%"
            bold
            fontSize="20px"
            textAlign="center"
          >
            {t('Enable MEV Protect')}
          </Text>
          <ModalCloseButton onDismiss={onDismiss} />
        </ModalHeader>
        <ModalBody p="24px">
          <FlexGap gap="24px" flexDirection="column" alignItems="center" minWidth="340px">
            <Box width="100%">
              <Text width="100%">{t('Add automatically on BNB Smart Chain:')}</Text>
              <Text bold width="100%">
                {t('PancakeSwap MEV Guard')}
              </Text>
            </Box>
            <ModalImg src={getImageUrl('swap-toggle-modal.png')} alt="swap-toggle-modal" />
            <Box width="100%">
              <AddMevRpcButton />
              <Button width="100%" variant="text" onClick={() => window.open('/mev', '_blank', 'noopener noreferrer')}>
                {t('Learn More')}
              </Button>
            </Box>
          </FlexGap>
        </ModalBody>
      </ModalContainer>
    </ModalV2>
  )
}
