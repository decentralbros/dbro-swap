import { useIsMounted } from "@pancakeswap/hooks";
import { useTranslation } from "@pancakeswap/localization";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  AutoColumn,
  IconButton,
  PencilIcon,
  RowBetween,
  Text,
  TextProps,
} from "@pancakeswap/uikit";
import { PropsWithChildren, ReactNode } from "react";

type GasData = {
  gasPrice: bigint;
  gwei: number;
  isHigh: boolean;
  isLow: boolean;
  chainName: string;
};

type SwapInfoType = {
  price: ReactNode;
  allowedSlippage?: number;
  onSlippageClick?: () => void;
  gasData: GasData | undefined;
};

export const SwapInfoLabel = (props: PropsWithChildren<TextProps>) => (
  <Text fontSize="14px" bold color="secondary" {...props} />
);

export const SwapInfo = ({ allowedSlippage, price, onSlippageClick, gasData }: SwapInfoType) => {
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  return (
    <AutoColumn gap="sm" py="0px" px="16px">
      <>
        <RowBetween alignItems="center">{price}</RowBetween>
        {gasData && (
          <RowBetween alignItems="center">
            <SwapInfoLabel>{t("Gas Estimate")}</SwapInfoLabel>

            {gasData.isLow && (
              <Text bold color="green" fontSize="14px">
                Low
                <ArrowDownIcon color="green" ml="4px" width="14px" />
              </Text>
            )}

            {!gasData.isLow && !gasData.isHigh && (
              <Text bold fontSize="14px">
                Average
              </Text>
            )}

            {gasData.isHigh && (
              <Text bold color="red" fontSize="14px">
                High
                <ArrowUpIcon color="red" ml="4px" width="14px" />
              </Text>
            )}
          </RowBetween>
        )}

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
      </>
    </AutoColumn>
  );
};
