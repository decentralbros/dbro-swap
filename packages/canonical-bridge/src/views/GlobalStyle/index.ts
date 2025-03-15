import { rgba } from 'polished'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Kanit', sans-serif !important;
    .bccb-widget-transfer-widget-wrapper {
      border: 1px solid;
      border-bottom: 2px solid;
      border-color: ${({ theme }) => (theme.isDark ? '#383241' : '#E7E3EB')};
      background: ${({ theme }) => (theme.isDark ? '#27262C ' : '#FFFFFF')};
      padding: 16px;
      gap: 16px;
      max-width: unset;
      box-shadow: none;
      .bccb-widget-network {
        gap: 2px;
      }
      .bccb-widget-transfer-widget-title {
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        text-align: left;
        line-height: 30px;
        display: none;
        ${({ theme }) => theme.mediaQueries.sm} {
          display: block;
        }
      }
    }
    .bccb-widget-network-row {
      gap: 8px;
      .bccb-widget-network-from, 
      .bccb-widget-network-to {
        height: 40px;
      }
      &>svg path {
        fill: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
        fill-opacity: 1;
      }
    }
    .bccb-widget-network-title, .bccb-widget-input-title, .bccb-widget-received-info-title, .bccb-widget-to-account-title {
      padding: 0 8px;
      align-items: center;
      color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
      & > p {
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
        text-overflow: ellipsis;
        display: block;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 21px;
      }
    }
    .bccb-widget-input-title {
      height: 29px;
    }
    .bccb-widget-network-button {
      padding: 0 8px;
      border-radius: 16px;
      border: 1px solid;
      outline: none;
      height: 40px;
      border-bottom-width: 2px;
      border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
      &:hover{
        opacity: 0.65;
      }
      &>svg {
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
      }
    }
    .bccb-widget-transfer-input-container {
      margin-top: 16px;
      .bccb-widget-transfer-max > div {
        color: ${({ theme }) => (theme.isDark ? '#48D0DB' : '#02919D')}; 
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
        line-height: 150%; /* 21px */
        &:hover {
          opacity: 0.65;
        }
      }
      .bccb-widget-transfer-input-error {
        padding: 0 8px;
      }
      .bccb-widget-transfer-input-wrapper {
        margin-top: 2px;
        border-radius: 16px;
        border: 1px solid;
        border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
        padding: 4px 4px 4px 16px;
        &:not(.input-error).input-focused {
            &, &:hover {
            box-shadow: 0px 0px 0px 1px #A881FC, 0px 0px 0px 4px rgba(168, 129, 252, 0.40);
            border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
          }
        }
        &:not(.input-error):hover {
          box-shadow: 0px 0px 0px 1px #A881FC, 0px 0px 0px 4px rgba(168, 129, 252, 0.40);
          outline: none;
        }
        input {
          font-size: 20px;
          font-style: normal;
          font-weight: 600;
          line-height: 30px;
          letter-spacing: -0.2px;
          &::placeholder {
            color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 30px */
            letter-spacing: -0.2px;
          }
        }
        .bccb-widget-token-select-button {
          outline: none;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.20);
          border-bottom: 2px solid rgba(0, 0, 0, 0.20);
          background: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: 24px;
          height: 40px;
          &, & svg {
            color: ${({ theme }) => (theme.isDark ? '#000000' : '#FFFFFF')};
          }
        }
      }
    }
    .bccb-widget-received-info-container {
      margin-bottom: 0px;
      & > div > div {
        gap: 6px;
      }
      
      .bccb-widget-received-info-route-content {
        border-radius: 16px;
        gap: 4px; 
        border: 1px solid ${({ theme }) => (theme.isDark ? '#383241' : '#E7E3EB')};
        padding: 12px;
        > div {
          gap: 2.5px; 
        }
        .bccb-widget-route-token {
          color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
          .bccb-widget-route-title-amount {
            font-family: 'Kanit', sans-serif;
            font-size: 24px; 
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 36px */
            letter-spacing: -0.24px;
          }
          .bccb-widget-route-token-tooltip {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%;
          }
          .bccb-widget-route-token-icon {
            & > div {
              font-weight: 600;
              font-size: 16px;
            }
            a {
              color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
              &:hover {
                opacity: 0.6;
              }
            }
            .alert-icon {
              color: #ED4B9E;
            }
          }
        }
      }
    }
    .bccb-widget-to-account-container {
      .bccb-widget-to-account-input {
        border-radius: 16px;
        &:not(.input-error).input-focused {
            &, &:hover {
            box-shadow: 0px 0px 0px 1px #A881FC, 0px 0px 0px 4px rgba(168, 129, 252, 0.40);
            border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
          }
        }
        &:not(.input-error):hover {
          box-shadow: 0px 0px 0px 1px #A881FC, 0px 0px 0px 4px rgba(168, 129, 252, 0.40);
          outline: none;
        }
        input {
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          letter-spacing: -0.2px;
          border-radius: 16px;
          border: 1px solid;
          border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
          &::placeholder {
            color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 30px */
            letter-spacing: -0.2px;
          }
          &:not(.input-error):focus, &:not(.input-error):hover {
            border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
            box-shadow: none;
            outline: none;
          }
        }
      }

      .bccb-widget-to-account-confirm {
        margin-top: 8px;
        margin-bottom: 0;
        & > div:nth-child(2) {
          color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 24px */
        }
      }
    }
    .bccb-widget-transfer-button-container {
      button {
        &.disabled,
        &.disabled:hover {
          background: ${({ theme }) => (theme.isDark ? '#3C3742' : '#F5F5F5')};
          color: ${({ theme }) => (theme.isDark ? '#666171' : '#BDC2C4')};
          border: none;
        }
        height: 48px;
        border-radius: 16px;
        border-bottom: 2px solid rgba(0, 0, 0, 0.20);
        background: #1FC7D4;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        &:not(.disabled):hover {
          background: #1FC7D4;
          opacity: 0.65;
        }
      }
    }

    .bccb-widget-allowed-send-amount {
      font-size: 14px;
      color:
    }

    /* network selection modal */
    .bccb-widget-from-network-modal-overlay, .bccb-widget-to-network-modal-overlay, .bccb-widget-token-modal-overlay, 
    .bccb-widget-transaction-confirming-modal-overlay, .bccb-widget-transaction-approve-modal-overlay, 
    .bccb-widget-transaction-failed-modal-overlay, .bccb-widget-transaction-submitted-modal-overlay,
    .bccb-widget-modal-route-overlay {
      opacity: ${({ theme }) => (theme.isDark ? '0.65' : '0.6')} !important;
      background: ${(props: any) =>
        props.isDark
          ? 'linear-gradient(0deg, rgba(109, 101, 146, 0.40) 0%, rgba(109, 101, 146, 0.40) 100%), #534A65'
          : '#280D5F'}; 
    }
    .bccb-widget-modal-no-result-found {
      margin: 24px auto;
      max-width: calc(100% - 32px);
      .title {
        color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
        margin-top: 16px;
        margin-bottom: 4px;
        font-size: 20px;
        font-weight: 600;
        line-height: 150%; /* 30px */
        letter-spacing: -0.2px;
      }
      .bccb-widget-modal-no-result-found-text {
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
      }
    }
    .bccb-widget-from-network-modal-content, .bccb-widget-to-network-modal-content {
      max-height: unset;
      ${({ theme }) => theme.mediaQueries.sm} {
        max-height: 80vh;
        width: 360px;
      }
      .bccb-widget-from-network-modal-body, .bccb-widget-to-network-modal-body {
        padding: 18px 0 12px;
        > div {
          margin-bottom: 16px;
          padding: 0;
        }
      }
      .bccb-widget-from-network-list-item-active-wrapper, .bccb-widget-to-network-list-item-active-wrapper {
        background: ${({ theme }) => (theme.isDark ? '#322B48' : '#EEEAF4')};
      }
      .bccb-widget-from-network-list-item, .bccb-widget-from-network-list-item-active,
      .bccb-widget-to-network-list-item, .bccb-widget-to-network-list-item-active {
        background: none;
        border: none;
      }
      .bccb-widget-from-network-list-item-wrapper, .bccb-widget-from-network-list-item-active-wrapper,
      .bccb-widget-to-network-list-item-wrapper, .bccb-widget-to-network-list-item-active-wrapper {
        padding: 0 24px;
        &:hover {
          background: ${({ theme }) => (theme.isDark ? '#322B48' : '#EEEAF4')};
        }
        .bccb-widget-from-network-list-item, .bccb-widget-from-network-list-item-active,
        .bccb-widget-to-network-list-item, .bccb-widget-to-network-list-item-active {
          padding: 12px 0;          
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 24px;
          color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
          img {
            outline: 2px solid ${({ theme }) => (theme.isDark ? '#372F47' : '#EEEAF4')};
          }
        }
      }
    }
    
    .bccb-widget-token-modal-content {
      width: 100vw;
      height: 100vh;
      background: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      ${({ theme }) => theme.mediaQueries.sm} {
        max-height: 80vh;
        width: 360px;
        height: 665px;
      }
      .bccb-widget-token-modal-body {
        padding: 12px 0;
        & > div {
          margin-bottom: 16px; 
          padding: 0;
        }
        .bccb-widget-token-modal-list-header {
          font-size: 14px;
          font-weight: 400;
          line-height: 21px;

          & > p:nth-child(2) {
            display: none;
          }
        }
        .bccb-widget-token-list-item-active-wrapper {
          background: ${({ theme }) => (theme.isDark ? '#322B48' : '#EEEAF4')};
        }

        .bccb-widget-token-list-item-wrapper, .bccb-widget-token-list-item-active-wrapper, .bccb-widget-token-list-item-disabled-wrapper {
          padding: 0;
          border-radius: 0;
          &:hover {
            background: ${({ theme }) => (theme.isDark ? '#322B48' : '#EEEAF4')};
          }
          .bccb-widget-token-list-item, .bccb-widget-token-list-item-active, .bccb-widget-token-list-item-disabled {
            padding: 12px 24px;
            border: none;
            height: 66px;
            border-radius: 0;
            background: none;
            img, .default-icon {
              width: 40px;
              height: 40px;
            }
            .bccb-widget-token-list-symbol {
              font-size: 16px;
              font-style: normal;
              font-weight: 600;
              line-height: 150%; /* 24px */
            }

            .bccb-widget-token-address-link {
              height: 18px;
              .bccb-widget-token-list-address {
                &, & > p {
                  display: block;
                  height: 18px;
                  font-size: 12px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 150%; /* 18px */
                  letter-spacing: 0.12px;
                }
              }
              .token-name {
                font-size: 12px;
                font-weight: 400;
                line-height: 150%; /* 18px */
                letter-spacing: 0.12px;
              }
            }

            .bccb-widget-token-list-token-balance > div {
              font-weight: 400;
            }
          }
        }
      }
    }
    .bccb-widget-from-network-modal-header, .bccb-widget-to-network-modal-header, .bccb-widget-token-modal-header,
    .bccb-widget-modal-route-header {
      margin: 24px 24px 0;
      height: 30px;
      color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
      font-size: 20px;
      font-weight: 600;
      line-height: 30px;
      letter-spacing: -0.2px;
      border-bottom: none;
      padding: 0;
      svg {
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
      }
    }
    .bccb-widget-token-modal-list-header {
      padding-bottom: 6px;
      > p {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%; /* 21px */
      }
    }
    .bccb-widget-from-network-modal-search, 
    .bccb-widget-to-network-modal-search {
      margin-bottom: 8px;
    } 
    .bccb-widget-token-modal-search, 
    .bccb-widget-from-network-modal-search, 
    .bccb-widget-to-network-modal-search {
      margin: 0 24px;
      border: none;
      outline: none;
      input {
        font-size: 16px;
        font-weight: 400;
        line-height: 150%; /* 24px */
        border-radius: 16px;
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
        background: ${({ theme }) => (theme.isDark ? '#372F47' : '#EEEAF4')};
        outline: none;
        border: none;
        border: 1px solid ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
        box-shadow: 0px 2px 0px -1px rgba(0, 0, 0, 0.16) inset;
        &:focus, &:hover {
          box-shadow: 0px 0px 0px 1px #A881FC, 0px 0px 0px 4px rgba(168, 129, 252, 0.40);
          border-color: ${({ theme }) => (theme.isDark ? '#55496E' : '#D7CAEC')};
          background: ${({ theme }) => (theme.isDark ? '#372F47' : '#EEEAF4')};
        }
        &::placeholder {
          color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 150%; /* 30px */
          letter-spacing: -0.2px;
        }
      }
      .bccb-widget-modal-search-right-element {
        button {
          background: transparent;
          &:hover {
            svg {
              color: #1E2026;
            }
            background: transparent;
          }
        }
      }
      svg {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
      }
    }
    .bccb-widget-route-fee-info {
      margin-top: -2px;
    }
    .bccb-widget-route-estimated-time, .bccb-widget-route-fee-info {
      font-size: 14px;
      font-weight: 400;
      line-height: 150%;
      overflow: hidden;
      color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
    }
    .bccb-widget-route-error,
    .bccb-widget-allowed-send-amount {
      display: flex;
      align-items: flex-start;
      color: ${({ theme }) => (theme.isDark ? '#FF9D00' : '#D67E0A')};
      > div {
        font-size: 14px;
        font-style: normal;
        line-height: 21px;
        margin-left: 6px;
      }
      > svg {
        margin-top: -1px;
        width: 24px;
        height: 24px;
      }
    }

    /* Route */
    .bccb-widget-route-container {
      background: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      max-width: 328px;
      padding: 0;
      box-shadow: none;
      .bccb-widget-route-container-inner {
        border: 1px solid;
        border-radius: 24px;
        border-bottom: 2px solid;
        border-color: ${({ theme }) => (theme.isDark ? '#383241' : '#E7E3EB')};
        gap: 8px;
        padding: 16px 0;
      }
      .bccb-widget-route-body {
        max-width: 328px;
        padding: 0 16px;
        max-height: unset;
        .bccb-widget-route-list {
          gap: 8px;
        }
      }
      .bccb-widget-route-header {
        padding: 0 16px;
        font-size: 12px;
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
        font-weight: 600;
        line-height: 150%; /* 18px */
        letter-spacing: 0.12px;
        height: 26px;
        // .skeleton {
        //   height: 20px;
        //   width: 20px;
        // }
      }

      .bccb-widget-route-wrapper-selected {
        border: 2px solid #1FC7D4;
      }
      .bccb-widget-route-wrapper {
        border-color: ${({ theme }) => (theme.isDark ? '#383241' : '#E7E3EB')};
        &.route-error {
          .bccb-widget-route-estimated-time, .bccb-widget-route-fee-info, .bccb-widget-route-error, 
          .bccb-widget-route-token, .bccb-widget-route-name, .bccb-widget-allowed-send-amount {
            opacity: 0.6;
          }
        }
        &:not(.route-error):hover {
          border-color: #1FC7D4;
        }
      }
      .bccb-widget-route-wrapper,
      .bccb-widget-route-wrapper-selected {
        color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
        border-radius: 16px;
        background: ${({ theme }) => (theme.isDark ? '#08060B' : '#FAF9FA')};
        .bccb-widget-route-name {
          svg, img {
            width: 24px;
            height: 24px;
          }
          .bccb-widget-route-name-text {
            font-size: 14px;
            font-weight: 600;
            line-height: 150%; /* 21px */
          }
        }
        .bccb-widget-route-token {
          .bccb-widget-route-title-amount {
            font-size: 24px;
            font-weight: 600;
            line-height: 150%; /* 36px */
            letter-spacing: -0.24px;
          }
          .bccb-widget-route-token-icon > div {
            font-weight: 600;
            font-size: 16px;
          }
          .bccb-widget-route-token-tooltip {
            font-size: 16px;
            font-weight: 600;
            line-height: 150%; /* 24px */
          }
        }
      }
    }

    /* Transfer Modal */
    .bccb-widget-transaction-confirming-modal, .bccb-widget-transaction-approve-modal,
    .bccb-widget-transaction-failed-modal, .bccb-widget-transaction-submitted-modal
    {
      background: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.16), 0px 4px 8px 0px rgba(0, 0, 0, 0.32);

      .bccb-widget-modal-close-button {
        color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
        &:hover {
          color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
        }
      }
      .bccb-widget-modal-body {
        padding: 20px 24px 0;
        .bccb-widget-modal-body-icon {
          margin-top: 56px;
          &, svg {
            width: 64px;
            height: 64px;
          }        
        }
        .bccb-widget-modal-body-title {
          font-size: 20px;
          font-weight: 600;
          line-height: 150%; /* 30px */
          letter-spacing: -0.2px;
          color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
        }
        .bccb-widget-modal-body-description {
            margin-top: 4px;
            font-size: 16px;
            font-weight: 400;
            line-height: 150%; /* 24px */
            color: ${({ theme }) => (theme.isDark ? '#B8ADD2' : '#7A6EAA')};
          & > p {
            font-size: 16px;
            font-weight: 600;
            line-height: 150%;
            color: ${({ theme }) => (theme.isDark ? '#F4EEFF' : '#280D5F')};
          }
        }
      }
      .bccb-widget-modal-footer {
        padding: 24px;
        gap: 8px;
      }
    }
    .bccb-widget-received-info-route-loading,
    .bccb-widget-route-skeleton,
    .bccb-widget-route-header {
      .chakra-skeleton {
        --skeleton-start-color: ${({ theme }) => (theme.isDark ? rgba('#FFFFFF', 0.05) : rgba('#08060B', 0.05))};
        --skeleton-end-color: ${({ theme }) => (theme.isDark ? rgba('#FFFFFF', 0.1) : rgba('#08060B', 0.1))};
      }
    }
    .bccb-widget-route-skeleton {
      border: none;
      background: ${({ theme }) => (theme.isDark ? '#08060B' : '#FAF9FA')};
    }

    .bccb-widget-received-info-route-open > div {
      color: ${({ theme }) => (theme.isDark ? '#48D0DB' : '#02919D')}; 
      font-size: 14px;
      font-weight: 600;
      line-height: 150%; /* 21px */
      &:hover {
        color: ${({ theme }) => (theme.isDark ? '#48D0DB' : '#02919D')}; 
        opacity: 0.6;
      }
    }

    .bccb-widget-refreshing-button {
      &:hover {
        opacity: 0.6;
      }
    }

    .bccb-widget-modal-main-button {
      border-radius: 16px;
      border-bottom: 2px solid rgba(0, 0, 0, 0.20);
      background: #1FC7D4;
      font-size: 16px;
      font-weight: 600;
      line-height: 150%; /* 24px */
      color: #FFF;
      &:hover {
        background: #1FC7D4;
        color: #FFF;
        opacity: 0.65;
      }
    }

    .bccb-widget-modal-second-button {
      border-radius: 16px;
      border: 2px solid #1FC7D4;
      color: #02919D;
      &:hover {
        border: 2px solid #1FC7D4;
        background: none;
        opacity: 0.65;
        color: #02919D;
      }
    }

    .bccb-widget-route-name-tag-bestTime,
    .bccb-widget-route-name-tag-bestReturn {
      color: ${({ theme }) => (theme.isDark ? '#000000' : '#FFFFFF ')};
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 21px */
      background: #1FC7D4;
      padding: 2px 9px;
      height: 25px;
    }
    .bccb-widget-route-name-tag-bestTime {
      background: ${({ theme }) => (theme.isDark ? '#A881FC' : '#7645D9')};
    }

    .bccb-widget-modal-route-content {
      width: 100vw;
      height: 100vh;
      background: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      ${({ theme }) => theme.mediaQueries.sm} {
        height: auto;
        max-height: 80vh;
        width: 360px;
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        width: 360px;
        height: auto;
      }
      .bccb-widget-modal-route-wrapper {
        padding: 0;
        overflow: auto;
      }
      .bccb-widget-route-container {
        width: 100%;
        max-width: unset;
        border-radius: none;
        .bccb-widget-route-body {
          width: 100%;
          max-width: unset;
          padding: 0 24px;
        }
        .bccb-widget-route-container-inner {
          padding: 24px 0;
          border: none;
          border-radius: none;
          ${({ theme }) => theme.mediaQueries.sm} {
            padding: 24px 0;
          }
          ${({ theme }) => theme.mediaQueries.lg} {
            padding: 0;
          }
        }
      }
      .bccb-widget-route-bottom {
        display: none;
      }
    }

    .bccb-widget-overview {
      &[data-show] {
        width: auto;
      }
      ${({ theme }) => theme.mediaQueries.sm} {
        &[data-show] {
          width: auto;
        }
      }
      ${({ theme }) => theme.mediaQueries.lg} {
        &[data-show] {
          width: 352px;
        }
      }
    }

    .bccb-widget-info-tooltip {
      background: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#27262C')};
      color: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      border-radius: 16px;
      padding: 16px;
      font-size: 14px;
      line-height: 150%;
      max-width: 280px;
      .chakra-tooltip__arrow {
        background: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#27262C')};
      }
      .bccb-widget-route-info-tooltip-fee {
        line-height: 150%;
        font-size: 14px;
        color: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
      }
    }

    .chakra-portal .chakra-popover__popper {
      z-index: 1;

      .bccb-widget-route-token-tooltip-content {
        --popper-arrow-bg: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#27262C')};;
        background: ${({ theme }) => (theme.isDark ? '#FFFFFF' : '#27262C')};
        border-radius: 16px;
        padding: 16px;
      }

      .bccb-widget-route-token-tooltip-body {
        padding: 0;
        &>div {
          color: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
          font-size: 14px;
          line-height: 150%;
          font-weight: 400;
          &>a:hover {
            color: ${({ theme }) => (theme.isDark ? '#27262C' : '#FFFFFF')};
          }
        }
      }
    }
  } /* body */
`

export default GlobalStyle
