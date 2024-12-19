import { PageHeader } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { LockCake } from './components/LockCake'
import { PageHead } from './components/PageHead'

const StakingMint = () => {
  // const [cakeRewardModalVisible, setCakeRewardModalVisible] = useState(false)
  // const handleDismiss = useCallback(() => setCakeRewardModalVisible(false), [])
  // const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* <ModalV2 isOpen={cakeRewardModalVisible} closeOnOverlayClick onDismiss={handleDismiss}>
        <CakeRewardsCard onDismiss={handleDismiss} />
      </ModalV2> */}
      <StyledPageHeader background="#000">
        <PageHead />
        <LockCake />
      </StyledPageHeader>

      {/* <CrossChainVeCakeModal isOpen={isOpen} setIsOpen={setIsOpen} onDismiss={() => setIsOpen(false)} /> */}
    </>
  )
}

const StyledPageHeader = styled(PageHeader)`
  padding-top: 32px;
  padding-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 56px;
    padding-bottom: 56px;
  }
`

export default StakingMint
