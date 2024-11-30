import { useTranslation } from '@pancakeswap/localization'
import { Box, Collapse, Text } from '@pancakeswap/uikit'
import { memo, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { faqConfig } from './config'
import { ConfigType } from './types'

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
`

export const FAQWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`

interface FAQProps {
  type: ConfigType
}

export const FAQ = memo(({ type }: FAQProps) => {
  const [activeIndex, setActiveIndex] = useState(-1)
  const { t } = useTranslation()

  const config = useMemo(() => faqConfig[type](t), [type, t])

  return (
    <FAQWrapper>
      {config &&
        config.data.map((faq, index) => (
          <Box key={`${type}-${faq.title}`} overflow="hidden">
            <Collapse
              isOpen={activeIndex === index}
              onToggle={() => {
                setActiveIndex(activeIndex === index ? -1 : index)
              }}
              title={<Text bold>{faq.title}</Text>}
              content={<Text>{faq.content}</Text>}
              titleBoxProps={{ p: '16px' }}
              contentBoxProps={{ p: '0px 16px 16px' }}
            />
            {index !== config.data.length - 1 && <Divider />}
          </Box>
        ))}
    </FAQWrapper>
  )
})
