import { rgba } from 'polished'

export const light = {
  input: {
    background: '#EEEAF4',
    title: '#8C8F9B',
    border: {
      default: '#D7CAEC',
      hover: '#E1E2E5',
      active: '#EBD600',
    },
  },
  text: {
    primary: '#280D5F',
    secondary: '#5C5F6A',
    tertiary: '#5C5F6A',
    placeholder: '#8C8F9B',
    inverse: '#FFFFFF',
    disabled: rgba('#181A1E', 0.3),
    brand: '#181A1E',
    warning: '#BC4E00',
    danger: '#ED4B9E',
    route: { title: '#5C5F6A' },
    network: {
      title: '#7A6EAA',
    },
    on: {
      color: {
        primary: '#FFFFFF',
        disabled: rgba('#FFFFFF', 0.4),
      },
    },
  },
  button: {
    wallet: {
      text: '#FFFFFF',
      background: { default: '#FFE900', hover: '#E1E2E5' },
    },
    refresh: {
      text: '#FFFAC2',
    },
    select: {
      text: '#280D5F',
      arrow: '#C4C5CB',
      border: '#373943',
      background: { default: '#F1F2F3', hover: '#E1E2E5' },
    },
    primary: {
      default: '#181A1E',
      subtle: '#E1E2E5',
      hover: '#1E2026',
      active: '#280D5F',
    },
    brand: {
      default: '#C2B100',
      subtle: '#FFFAC2',
      hover: '#948700',
      active: '#857900',
    },
    success: {
      default: '#12A55E',
      subtle: '#BFF8DC',
      hover: '#0E8149',
      active: '#115F39',
    },
    danger: {
      default: '#ED4B9E',
      subtle: '#FDE2E4',
      hover: '#A91E27',
      active: '#821119',
    },
    disabled: rgba('#181A1E', 0.4),
  },
  modal: {
    title: '#5C5F6A',
    item: {
      text: { primary: '#181A1E', secondary: '#5C5F6A' },
      background: { default: '#F7F7F8', hover: '#F7F7F8' },
    },
    back: {
      default: '#8C8F9B',
      hover: '#181A1E',
    },
    close: {
      default: '#8C8F9B',
      hover: '#181A1E',
    },
  },
  background: {
    1: '#FFFFFF',
    2: '#F7F7F8',
    3: '#F1F2F3',
    brand: '#FFE900',
    modal: '#F7F7F8',
    main: '#FFFFFF',
    route: '#F7F7F8',
    warning: '#FFEADB',
    tag: '#E1E2E5',
    body: '#F1F2F3',
  },
  receive: {
    background: '#FAF9FA',
  },
  border: {
    inverse: '#181A1E',
    brand: '#EBD600',
    disabled: '#C4C5CB',
  },
  route: {
    background: { highlight: 'rgba(255, 233, 0, 0.06)' },
    border: '#373943',
    warning: '#BC4E00',
  },
  overlay: rgba('#14151A', 0.2),
  popover: {
    background: '#373943',
    selected: '#5C5F6A',
    shadow: ' 0px 4px 8px 0px rgba(0, 0, 0, 0.48)',
    separator: '#5C5F6A',
  },
}
