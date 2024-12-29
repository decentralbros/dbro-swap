import { useTranslation } from "@pancakeswap/localization";
import { Button, CheckmarkCircleIcon, RowFixed, Text, useMatchBreakpoints } from "@pancakeswap/uikit";
import { styled } from "styled-components";

const CheckIcon = styled(CheckmarkCircleIcon)`
  height: 16px;
  width: 16px;
  margin-right: 6px;
  stroke: ${({ theme }) => theme.colors.success};
`;

export function TokenRowButton<T>({
  token,
  isActive,
  isAdded,
  setImportToken,
  showImportView,
}: {
  token: T;
  isActive: boolean;
  isAdded: boolean;
  setImportToken: (token: T) => void;
  showImportView: () => void;
}) {
  const { t } = useTranslation();
  const { isMobile } = useMatchBreakpoints();
  return !isActive && !isAdded ? (
    <Button
      scale={isMobile ? "sm" : "md"}
      width="fit-content"
      style={{ color: "#000" }}
      onClick={() => {
        if (setImportToken) {
          setImportToken(token);
        }
        showImportView();
      }}
    >
      {t("Import")}
    </Button>
  ) : (
    <RowFixed style={{ minWidth: "fit-content" }}>
      <CheckIcon />
      <Text color="success">Active</Text>
    </RowFixed>
  );
}
