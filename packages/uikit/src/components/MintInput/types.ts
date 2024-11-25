import { InputHTMLAttributes, ReactNode } from "react";
import { BoxProps } from "../Box";
import { InputProps } from "../Input";

export interface MintInputProps extends BoxProps {
  value: string | number;
  onUserInput: (input: string) => void;
  inputAlign?: "left" | "right";
  innerRef?: React.RefObject<HTMLInputElement>;
  currencyValue?: ReactNode;
  placeholder?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "placeholder" | "onChange"> & InputProps;
  isWarning?: boolean;
  decimals?: number;
  unit?: ReactNode;
  appendComponent?: ReactNode;
  switchEditingUnits?: () => void;
}
