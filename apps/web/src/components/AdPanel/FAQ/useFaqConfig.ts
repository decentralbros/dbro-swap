import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { faqConfig, faqTypeByPage } from './config'
import { FAQConfig } from './types'

export const useFaqConfig = (): FAQConfig => {
  const router = useRouter()
  return useMemo(() => faqConfig[faqTypeByPage[router.pathname]] ?? {}, [router.pathname])
}
