import { Box, Button } from '@pancakeswap/uikit'
import dayjs from 'dayjs'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useAccount } from 'wagmi'

const unmountAnimation = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `

const mountAnimation = keyframes`
    0% {
     opacity: 0;
    }
    100% {
     opacity: 1;
    }
  `

const StyledOverlay = styled(Box)<{ isUnmounting?: boolean }>`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => `${theme.colors.text99}`};
  z-index: 20;
  will-change: opacity;
  animation: ${mountAnimation} 350ms ease forwards;
  ${({ isUnmounting }) =>
    isUnmounting &&
    css`
      animation: ${unmountAnimation} 350ms ease forwards;
    `}
`

const BodyLock = () => {
  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
    `
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.cssText = `
        overflow: visible;
        overflow: overlay;
      `
    }
  }, [])

  return null
}

const Container = styled.div`
  max-width: 36rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transform: translate(0%, 360px);
  z-index: 30;
`

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const DialogContent = styled.div`
  background: #08060b;
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 32rem;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`

const DialogTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
`

const DialogDescription = styled.div`
  color: #fff;
`

const TermsMessage = styled.pre`
  background: #000;
  padding: 1rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 1rem 0;
`

const Link = styled.a`
  color: #1bf696;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`

const AddressDisplay = styled.div`
  font-family: monospace;
  background: #000;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  white-space: pre-wrap;
  word-break: break-word;
`

type AuthResponse = {
  isValid: boolean
  error?: string
}

/**
 * Submit wallet signature to authenticate user
 */
export const authenticateWallet = async (
  message: string,
  signature: string,
  address: string,
): Promise<AuthResponse> => {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature, address }),
    })

    const data: AuthResponse = await response.json()

    if (!response.ok) {
      return {
        isValid: false,
        error: data.error || `Request failed with status ${response.status}`,
      }
    }

    return data
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'Authentication request failed',
    }
  }
}

const TermsSignature = ({ signMessageAsync, isPending }) => {
  const { address } = useAccount()
  const { logout } = useAuth()

  const TERMS_MESSAGE = `I have read and agree to the Terms of Service available at:\n\nhttps://decentralbros.finance/terms-of-service\n\nDate: ${dayjs().format(
    'MMMM DD, YYYY',
  )}`

  const handleSign = async () => {
    if (!address) return

    try {
      const signature = await signMessageAsync({ message: TERMS_MESSAGE })

      authenticateWallet(TERMS_MESSAGE, signature, address).then((result) => {
        if (result.isValid) {
          localStorage.setItem('signed-dbro-terms', address)
        } else {
          logout()
          console.error('Authentication failed:', result.error)
        }
      })
    } catch (error) {
      logout()
      console.info('Error signing message:', error)
    }
  }

  return (
    <>
      <Container>
        <Dialog>
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogTitle>Terms of Service Agreement</DialogTitle>
            <DialogDescription>
              <p>Please review our Terms of Service before proceeding:</p>
              <br />
              <Link href="https://decentralbros.finance/terms-of-service" target="_blank" rel="noopener noreferrer">
                View Terms of Service
              </Link>

              <TermsMessage>
                Signing with wallet:
                <AddressDisplay>{address}</AddressDisplay>
              </TermsMessage>

              <TermsMessage>{TERMS_MESSAGE}</TermsMessage>
            </DialogDescription>

            <ButtonGroup>
              <Button scale="md" variant="secondary" onClick={logout} disabled={isPending}>
                Disconnect
              </Button>

              <Button scale="md" variant="primary" onClick={handleSign} style={{ color: '#000' }} disabled={isPending}>
                {isPending ? 'Signing...' : 'Sign & Accept'}
              </Button>
            </ButtonGroup>
          </DialogContent>
        </Dialog>
      </Container>

      <BodyLock />
      <StyledOverlay role="presentation" />
    </>
  )
}

export default TermsSignature
