import FarmsV3 from './FarmsV3'
import { FarmsContext, FarmsV3Context } from './context'

export const FarmsV3PageLayout: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <FarmsV3>{children}</FarmsV3>
}

export { FarmsContext, FarmsV3Context }
