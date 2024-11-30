import { Text, TextProps } from '@pancakeswap/uikit'
import { PropsWithChildren } from 'react'

interface BodyTextProps extends TextProps, PropsWithChildren {}

export const BodyText = ({ children, ...props }: BodyTextProps) => {
  return (
    <Text fontSize="14px" mb="16px" bold {...props}>
      {children}
    </Text>
  )
}
