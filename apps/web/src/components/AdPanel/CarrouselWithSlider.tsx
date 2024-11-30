import { appearAnimation } from '@pancakeswap/uikit'
import { keyframes, styled } from 'styled-components'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Swiper } from 'swiper/react'

const progress = keyframes`
  from {transform: scaleX(0.05);}
  to { transform: scaleX(1);}
`

export const StyledSwiper = styled(Swiper)<{ $showPagination?: boolean }>`
  width: 328px;
  overflow: visible;
  opacity: 0;
  margin: 0;
  animation: ${appearAnimation} 0.2s ease-in-out 0.1s forwards;

  .swiper-pagination {
    position: absolute;
    left: 18px;
    bottom: 16px;
    width: 148px;

    display: flex;
    justify-content: center;

    gap: 4px;
  }

  .swiper-pagination-bullet {
    display: ${({ $showPagination = true }) => ($showPagination ? 'block' : 'none')};
    position: relative;
    background-color: ${({ theme }) => theme.colors.inputSecondary};
    margin: 0 !important;
    flex-grow: 1;
    border-radius: 4px;
    height: 4px;
    overflow: hidden;
    opacity: 1;

    &.swiper-pagination-bullet-active {
      &::before {
        content: '';
        border-radius: 4px;
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: ${({ theme }) => theme.colors.secondary};
        animation: ${progress} 5s linear forwards;
        transform-origin: left center;
      }
      &.pause::before {
        animation-play-state: paused;
      }
    }
  }
`
