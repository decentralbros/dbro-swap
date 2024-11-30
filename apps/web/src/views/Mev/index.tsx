import { styled } from 'styled-components'
import { Hero } from './Hero'
import { InfoSection } from './InfoSection'
import { MevIntroSection } from './MevIntroSection'
import { PageProps } from './types'

export const Wrapper = styled.div``

export const MevLanding: React.FC<PageProps> = ({ txCount, walletCount }) => {
  return (
    <Wrapper>
      <Hero txCount={txCount} />
      <MevIntroSection />
      <InfoSection walletCount={walletCount} />
    </Wrapper>
  )
}
