import { useDefaultsFromURLSearch } from 'state/buyCrypto/hooks'
import { BuyCryptoForm } from './containers/BuyCryptoForm'
import { useProviderAvailabilities } from './hooks/useProviderAvailabilities'
import { StyledAppBody } from './styles'

export default function BuyCrypto() {
  useDefaultsFromURLSearch()
  const { data: providerAvailabilities } = useProviderAvailabilities()
  return (
    <StyledAppBody mb="24px">
      <BuyCryptoForm providerAvailabilities={providerAvailabilities} />
    </StyledAppBody>
  )
}
