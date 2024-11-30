import { Modal, ModalV2, useMatchBreakpoints } from '@pancakeswap/uikit'
import { ReactNode } from 'react'
import { ExpandableActions } from './ExpandableActions'

interface ExpandableModalProps {
  title: string
  isOpen: boolean
  expandableContent?: ReactNode
  actionButton?: ReactNode
  onDismiss: () => void
}

export const ExpandableModal = ({
  title,
  isOpen,
  expandableContent,
  actionButton,
  onDismiss,
}: ExpandableModalProps) => {
  const { isDesktop } = useMatchBreakpoints()
  return (
    <>
      <ModalV2 isOpen={isOpen} onDismiss={onDismiss} closeOnOverlayClick>
        <Modal title={title} onDismiss={onDismiss} maxWidth={isDesktop ? '438px' : 'unset'}>
          {expandableContent}
          <ExpandableActions
            mt="16px"
            actionButton={actionButton}
            handleDismiss={onDismiss}
            style={{ borderTop: 'none', padding: '4px' }}
            isExpanded
          />
        </Modal>
      </ModalV2>
    </>
  )
}
