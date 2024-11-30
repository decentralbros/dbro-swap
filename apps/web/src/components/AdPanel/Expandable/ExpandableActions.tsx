import { appearAnimation, Box, FlexProps } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { ExpandButton } from '../Button'
import { ActionContainer } from './styles'

const StyledBox = styled(Box)`
  animation: ${appearAnimation} 0.3s ease-in-out;
`

interface ExpandableActionsProps extends FlexProps {
  /** Secondary Action Button */
  actionButton?: React.ReactNode
  isExpanded: boolean
  actionPanelRef?: React.RefObject<HTMLDivElement>
  handleDismiss: () => void
  handleExpand?: () => void
  toggleHeight?: (isHovering: boolean, isExpanded: boolean) => void
}

export const ExpandableActions = ({
  isExpanded,
  actionPanelRef,
  actionButton,
  handleDismiss,
  handleExpand,
  ...props
}: ExpandableActionsProps) => {
  return (
    <ActionContainer ref={actionPanelRef} p={isExpanded ? '16px' : '0'} $isExpanded={isExpanded} {...props}>
      <ExpandButton
        mb={isExpanded ? '0' : '16px'}
        onClick={isExpanded ? handleDismiss : handleExpand}
        isExpanded={isExpanded}
      />
      {isExpanded && actionButton && <StyledBox>{actionButton}</StyledBox>}
    </ActionContainer>
  )
}
