import React from "react";
import { Box, Flex } from "../Box";
import { StyledBalanceInput, StyledInput } from "./styles";
import { MintInputProps } from "./types";

const MintInput: React.FC<React.PropsWithChildren<MintInputProps>> = ({
  value,
  placeholder = "0",
  onUserInput,
  inputProps,
  innerRef,
  isWarning = false,
  unit,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      onUserInput(e.currentTarget.value.replace(/,/g, "."));
    }
  };

  return (
    <StyledBalanceInput isWarning={isWarning} {...props}>
      <Flex justifyContent="flex-end">
        <Flex width="100%" alignItems="center">
          <Flex alignSelf="center" width={40} mr={12}>
            <img width={40} height={40} src="/logo.webp" alt="logo" />
          </Flex>{" "}
          <Box width="100%">
            <Flex alignItems="center">
              <StyledInput
                type="number"
                inputMode="numeric"
                min="0"
                max="10"
                value={value}
                onChange={handleOnChange}
                placeholder={placeholder}
                ref={innerRef}
                {...inputProps}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </StyledBalanceInput>
  );
};

export default MintInput;
