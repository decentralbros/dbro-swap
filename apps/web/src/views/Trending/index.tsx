import { Box, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useEffect, useState } from 'react'
import { TrendingData } from 'state/info/types'
import { styled } from 'styled-components'
import { PageHead } from './components/PageHead'
import TrendingTable from './components/TrendingTable'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Trending: React.FC<React.PropsWithChildren> = () => {
  const { isMobile } = useMatchBreakpoints()
  const [trendingTokens, setTrendingTokens] = useState<TrendingData[]>([])

  useEffect(() => {
    const fetchTrendingTokens = async () => {
      try {
        const response = await fetch('/api/trending')
        const data = await response.json()
        setTrendingTokens(data)
      } catch (error) {
        console.error('Error fetching trending tokens:', error)
      }
    }

    fetchTrendingTokens()
  }, [])

  return (
    <Box
      style={{
        width: isMobile ? '100vw' : 'calc(100vw - 8px)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        backgroundColor: '#050611',
      }}
    >
      <style jsx global>
        {`
          #home-1 .page-bg {
            background: #000;
          }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%', overflow: 'visible', padding: '16px', paddingBottom: '0' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <PageHead />
        <TrendingTable tokenData={trendingTokens} />
      </StyledHeroSection>
    </Box>
  )
}

export default Trending
