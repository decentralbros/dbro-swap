import React from "react";
import { styled } from "styled-components";
import { Colors } from "../../theme";
import Skeleton from "../Skeleton/Skeleton";
import Text from "../Text/Text";

export interface Props {
  color?: keyof Colors;
  cakePriceUsd?: number;
  showSkeleton?: boolean;
  chainId: number;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const CakePrice: React.FC<React.PropsWithChildren<Props>> = ({
  cakePriceUsd,
  color = "textSubtle",
  showSkeleton = true,
}) => {
  return cakePriceUsd ? (
    <PriceLink href="https://decentralbros.finance/swap?chain=base&outputCurrency=0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F">
      <img src="/token.webp" alt="token" width="24px" height="24px" />
      <Text color={color} bold>{`$${cakePriceUsd.toFixed(4)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(CakePrice);
