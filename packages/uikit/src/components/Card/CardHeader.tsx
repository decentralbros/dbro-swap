import shouldForwardProp from "@styled-system/should-forward-prop";
import { styled } from "styled-components";
import { space, SpaceProps } from "styled-system";
import { CardTheme } from "./types";

export interface CardHeaderProps extends SpaceProps {
  variant?: keyof CardTheme["cardHeaderBackground"];
}

const CardHeader = styled.div.withConfig({
  shouldForwardProp,
})<CardHeaderProps>`
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
  ${space}
  z-index: 2;
  background: none;
  border-bottom: 1px ${({ theme }) => theme.colors.cardBorder} solid;
`;

CardHeader.defaultProps = {
  p: "24px",
};

export default CardHeader;
