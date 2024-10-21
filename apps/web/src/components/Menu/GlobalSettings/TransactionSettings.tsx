import { useTranslation } from '@pancakeswap/localization'
import { Box, Button, Flex, Input, QuestionHelper, Text } from '@pancakeswap/uikit'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { useState } from 'react'

// enum SlippageError {
//   InvalidInput = 'InvalidInput',
//   RiskyLow = 'RiskyLow',
//   RiskyHigh = 'RiskyHigh',
// }

// enum DeadlineError {
//   InvalidInput = 'InvalidInput',
// }

// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group
// const THREE_DAYS_IN_SECONDS = 60 * 60 * 24 * 3

const SlippageTabs = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippage()
  // const [ttl, setTTL] = useUserTransactionTTL()
  const [slippageInput, setSlippageInput] = useState('')
  // const [deadlineInput, setDeadlineInput] = useState('')

  const { t } = useTranslation()

  // const slippageInputIsValid =
  //   slippageInput === '' || userSlippageTolerance.toFixed(1) === Number.parseFloat(slippageInput).toFixed(1)
  // const deadlineInputIsValid =
  //   deadlineInput === '' || (ttl !== undefined && (Number(ttl) / 60).toString() === deadlineInput)

  // let slippageError: SlippageError | undefined
  // if (slippageInput !== '' && !slippageInputIsValid) {
  //   slippageError = SlippageError.InvalidInput
  // } else if (slippageInputIsValid && userSlippageTolerance < 50) {
  //   slippageError = SlippageError.RiskyLow
  // } else if (slippageInputIsValid && userSlippageTolerance > 500) {
  //   slippageError = SlippageError.RiskyHigh
  // } else {
  //   slippageError = undefined
  // }

  // let deadlineError: DeadlineError | undefined
  // if (deadlineInput !== '' && !deadlineInputIsValid) {
  //   deadlineError = DeadlineError.InvalidInput
  // } else {
  //   deadlineError = undefined
  // }

  // const parseCustomSlippage = (value: string) => {
  //   if (value === '' || inputRegex.test(escapeRegExp(value))) {
  //     setSlippageInput(value)

  //     try {
  //       const valueAsIntFromRoundedFloat = Number.parseInt(Number.parseFloat(value).toFixed(1))
  //       if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 10) {
  //         setUserSlippageTolerance(valueAsIntFromRoundedFloat)
  //       }
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // }

  // const parseCustomDeadline = (value: string) => {
  //   setDeadlineInput(value)

  //   try {
  //     const valueAsInt: number = Number.parseInt(value) * 60
  //     if (!Number.isNaN(valueAsInt) && valueAsInt > 60 && valueAsInt < THREE_DAYS_IN_SECONDS) {
  //       setTTL(valueAsInt)
  //     } else {
  //       deadlineError = DeadlineError.InvalidInput
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" mb="28px">
        <Flex mb="12px">
          <Text>{t('Slippage Tolerance')}</Text>
          <QuestionHelper
            text={t(
              'Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution.',
            )}
            placement="top"
            ml="8px"
          />
        </Flex>
        <Flex flexWrap="wrap">
          <Button
            mt="8px"
            mr="8px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(1)
            }}
            style={{ color: userSlippageTolerance === 1 ? '#000' : '' }}
            variant={userSlippageTolerance === 1 ? 'primary' : 'tertiary'}
          >
            1.0%
          </Button>
          <Button
            mt="8px"
            mr="8px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(2)
            }}
            style={{ color: userSlippageTolerance === 2 ? '#000' : '' }}
            variant={userSlippageTolerance === 2 ? 'primary' : 'tertiary'}
          >
            2.0%
          </Button>
          <Button
            mr="8px"
            mt="8px"
            scale="sm"
            onClick={() => {
              setSlippageInput('')
              setUserSlippageTolerance(3)
            }}
            style={{ color: userSlippageTolerance === 3 ? '#000' : '' }}
            variant={userSlippageTolerance === 3 ? 'primary' : 'tertiary'}
          >
            3.0%
          </Button>
          <Flex alignItems="center">
            <Box width="66px" mt="8px">
              <Input
                scale="sm"
                inputMode="decimal"
                pattern="^[0-9]*[.,]?[0-9]{0,1}$"
                placeholder={userSlippageTolerance.toFixed(1)}
                value={slippageInput}
                onChange={(event) => {
                  if (!Number.isNaN(Number(event.target.value))) setUserSlippageTolerance(Number(event.target.value))
                }}
                isSuccess={userSlippageTolerance <= 3}
                isWarning={userSlippageTolerance >= 4 || userSlippageTolerance <= 0}
              />
            </Box>
            <Text color="primary" bold ml="8px">
              %
            </Text>
          </Flex>
        </Flex>
        {/* {!!slippageError && (
          <Text fontSize="18px" color={slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'} mt="8px">
            {slippageError === SlippageError.InvalidInput
              ? t('Enter a valid slippage percentage')
              : slippageError === SlippageError.RiskyLow
              ? t('Your transaction may fail')
              : t('Your transaction may be frontrun')}
          </Text>
        )} */}
      </Flex>
      {/* <Flex justifyContent="space-between" alignItems="center" mb="28px">
        <Flex alignItems="center">
          <Text>{t('Tx deadline (mins)')}</Text>
          <QuestionHelper
            text={t('Your transaction will revert if it is left confirming for longer than this time.')}
            placement="top"
            ml="8px"
          />
        </Flex>
        <Flex>
          <Box width="52px" mt="8px">
            <Input
              scale="sm"
              inputMode="numeric"
              pattern="^[0-9]+$"
              isWarning={!!deadlineError}
              placeholder={(Number(ttl) / 60).toString()}
              value={deadlineInput}
              onChange={(event) => {
                if (event.currentTarget.validity.valid) {
                  parseCustomDeadline(event.target.value)
                }
              }}
            />
          </Box>
        </Flex>
      </Flex> */}
    </Flex>
  )
}

export default SlippageTabs
