import { useIsMounted } from "@pancakeswap/hooks";
import { useTranslation } from "@pancakeswap/localization";
import { AutoColumn, IconButton, PencilIcon, RowBetween, Text, TextProps } from "@pancakeswap/uikit";
import { PropsWithChildren, ReactNode } from "react";

type SwapInfoType = {
  price: ReactNode;
  allowedSlippage?: number;
  onSlippageClick?: () => void;
  allowedSlippageSlot?: React.ReactNode;
};

export const SwapInfoLabel = (props: PropsWithChildren<TextProps>) => (
  <Text fontSize="14px" bold color="secondary" {...props} />
);

export const SwapInfo = ({ allowedSlippage, price, onSlippageClick, allowedSlippageSlot }: SwapInfoType) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  return (
    <AutoColumn gap="sm" py="0px" px="16px">
      <RowBetween alignItems="center">{price}</RowBetween>
      {typeof allowedSlippage === "number" && (
        <RowBetween alignItems="center">
          <SwapInfoLabel>
            {t("Slippage Tolerance")}
            {onSlippageClick ? (
              <IconButton
                scale="sm"
                variant="text"
                onClick={onSlippageClick}
                data-dd-action-name="Swap slippage button"
              >
                <PencilIcon color="primary" width="14px" />
              </IconButton>
            ) : null}
          </SwapInfoLabel>
          {isMounted && (
            <Text bold color="primary" fontSize="14px">
              {allowedSlippage.toFixed(1)}%
            </Text>
          )}
        </RowBetween>
      )}
    </AutoColumn>
  );
};
