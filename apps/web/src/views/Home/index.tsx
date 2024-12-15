import { Box, PageSection, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { styled } from 'styled-components'
import CommunitySection from './components/CommunitySection'
import EcoSystemSection from './components/EcoSystemSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import { InnerWedgeWrapper, OuterWedgeWrapper, WedgeTopLeft } from './components/WedgeSvgs'

const StyledHeroSection = styled(PageSection)`
  padding-top: 16px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 48px;
  }
`

const Home: React.FC<React.PropsWithChildren> = () => {
  const { theme } = useTheme()
  const HomeSectionContainerStyles = { margin: '0', width: '100%', maxWidth: '968px', padding: '0px 16px' }
  const { isMobile } = useMatchBreakpoints()

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

          #home-2 .page-bg {
            background: #000;
          }

          #home-3 .page-bg {
            background: linear-gradient(180deg, #0b4576 0%, #091115 100%);
          }

          #home-4 .inner-wedge svg {
            fill: #201335;
          }

          #bottom-wedge4-2 svg {
            fill: #0b4576;
          }
        `}
      </style>
      <StyledHeroSection
        innerProps={{ style: { margin: '0', width: '100%', overflow: 'visible', padding: '16px' } }}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        {/* <MultipleBanner /> */}
        <Hero />
      </StyledHeroSection>

      {/* <PageSection
        innerProps={{ style: { ...HomeSectionContainerStyles, maxWidth: 'auto' } }}
        background={theme.colors.background}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <MetricsSection />
      </PageSection> */}

      {/* <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background={theme.colors.background}
        containerProps={{
          id: 'home4-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <CakeSection /> */}
      {/* <Flex style={{ gap: 5 }} justifyContent="center" mt="40px">
          <Text fontSize={24} bold>
            CAKE
          </Text>
          <Text fontSize={24} bold color="secondary">
            Figures
          </Text>
        </Flex>
        <CakeDataRow /> */}
      {/* </PageSection> */}

      <PageSection
        innerProps={{ style: { ...HomeSectionContainerStyles, maxWidth: 'auto', paddingBottom: '32px' } }}
        background={theme.colors.background}
        containerProps={{
          id: 'home-1',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <OuterWedgeWrapper>
          <InnerWedgeWrapper top>
            <WedgeTopLeft />
          </InnerWedgeWrapper>
        </OuterWedgeWrapper>
        <EcoSystemSection />
      </PageSection>

      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        containerProps={{
          id: 'home-2',
        }}
        index={2}
        hasCurvedDivider={false}
      >
        <CommunitySection />
      </PageSection>

      {/* <PageSection
        innerProps={{
          style: {
            ...HomeSectionContainerStyles,
            maxWidth: '1400px',
          },
        }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <NewsSection />
      </PageSection> */}

      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="linear-gradient(180deg, #000 0%, #0E7B4B 100%)"
        index={2}
        hasCurvedDivider={false}
      >
        <Footer />
      </PageSection>
    </Box>
  )
}

export default Home
