import { Box, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { PropsWithChildren, ReactNode } from 'react'
import { Divider } from './styles'

interface ExpandableContentProps extends PropsWithChildren {
  title: string
  isExpanded: boolean
  expandableContent?: ReactNode
  extendedContentRef?: React.RefObject<HTMLDivElement>
  defaultContent?: ReactNode
}

export const ExpandableContent = ({
  title,
  isExpanded,
  expandableContent,
  defaultContent,
  extendedContentRef,
}: ExpandableContentProps) => {
  const { isMobile } = useMatchBreakpoints()
  return (
    <>
      {isExpanded ? (
        <Box overflow="hidden" height="calc(100% - 64px)" position="relative">
          <Text bold as="h1" textAlign="center" p="16px">
            {title}
          </Text>
          <Divider />
          <Box
            ref={extendedContentRef}
            position="relative"
            p="16px"
            height="calc(100% - 56px)"
            overflowY={isMobile ? 'hidden' : 'scroll'}
          >
            {expandableContent}
          </Box>
        </Box>
      ) : (
        defaultContent
      )}
    </>
  )
}
