import { Box, Skeleton, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'

import { useTranslation } from '@pancakeswap/localization'
import orderBy from 'lodash/orderBy'
import { TokenData, TrendingData } from 'state/info/types'
import { formatAmount } from 'utils/formatInfoNumbers'
import { Break, ClickableColumnHeader, TableWrapper } from './shared'

/**
 *  Columns on different layouts
 *  6 = | # | Name | Price | Price Change | Volume 24H | TVL |
 *  5 = | # | Name | Price |              | Volume 24H | TVL |
 *  4 = | # | Name | Price |              | Volume 24H |     |
 *  2 = |   | Name |       |              | Volume 24H |     |
 *  On smallest screen Name is reduced to just symbol
 */
const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  padding: 0 24px;

  grid-template-columns: 20px 3fr repeat(4, 1fr);
`

const TableLoader: React.FC<React.PropsWithChildren> = () => {
  const loadingRow = (
    <ResponsiveGrid>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </ResponsiveGrid>
  )
  return (
    <>
      {loadingRow}
      {loadingRow}
      {loadingRow}
    </>
  )
}

const DataRow: React.FC<React.PropsWithChildren<{ tokenData: TrendingData; index: number }>> = ({
  tokenData,
  index,
}) => {
  const { isXs, isSm } = useMatchBreakpoints()

  return (
    <ResponsiveGrid>
      <Text>{index + 1}</Text>
      {/* <ResponsiveLogo size="24px" address={tokenData.address} chainName={chainName} /> */}
      <Text width="75px">{tokenData.symbol}</Text>

      <Text width="75px">{tokenData.chainName}</Text>

      <Text fontWeight={400} color="secondary">
        ${formatAmount(tokenData.totalVolumeUSD, { notation: 'standard' })}
      </Text>
    </ResponsiveGrid>
  )
}

const SORT_FIELD = {
  token: 'symbol',
  chainName: 'chainName',
  address: 'address',
  totalVolumeUSD: 'totalVolumeUSD',
}

const MAX_ITEMS = 10

const TrendingTable: React.FC<
  React.PropsWithChildren<{
    tokenData: TrendingData[]
    maxItems?: number
  }>
> = ({ tokenData, maxItems = MAX_ITEMS }) => {
  const [sortField, setSortField] = useState(SORT_FIELD.totalVolumeUSD)
  const [sortDirection, setSortDirection] = useState<boolean>(true)
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  useEffect(() => {
    let extraPages = 1
    if (tokenData) {
      if (tokenData.length % maxItems === 0) {
        extraPages = 0
      }
      setMaxPage(Math.floor(tokenData.length / maxItems) + extraPages)
    }
  }, [maxItems, tokenData])

  const sortedTokens = useMemo(() => {
    return tokenData
      ? orderBy(tokenData, (data) => data?.[sortField as keyof TokenData], sortDirection ? 'desc' : 'asc').slice(
          maxItems * (page - 1),
          page * maxItems,
        )
      : []
  }, [tokenData, maxItems, page, sortDirection, sortField])

  // const handleSort = useCallback(
  //   (newField: string) => {
  //     setSortField(newField)
  //     setSortDirection(sortField !== newField ? true : !sortDirection)
  //   },
  //   [sortDirection, sortField],
  // )

  // const arrow = useCallback(
  //   (field: string) => {
  //     const directionArrow = !sortDirection ? '↑' : '↓'
  //     return sortField === field ? directionArrow : ''
  //   },
  //   [sortDirection, sortField],
  // )

  if (!tokenData) {
    return <Skeleton />
  }
  return (
    <TableWrapper>
      <ResponsiveGrid>
        <Text color="secondary" fontSize="12px" bold>
          #
        </Text>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Token')}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('Chain')}
        </ClickableColumnHeader>
        <ClickableColumnHeader
          color="secondary"
          fontSize="12px"
          bold
          // onClick={() => handleSort(SORT_FIELD.address)}
          textTransform="uppercase"
        >
          {t('Total Volume')} {/* arrow(SORT_FIELD.address) */}
        </ClickableColumnHeader>
      </ResponsiveGrid>

      <Break />
      {sortedTokens.length > 0 ? (
        <>
          {sortedTokens.map((data, i) => {
            if (data) {
              return (
                <Fragment key={data.address}>
                  <DataRow index={(page - 1) * MAX_ITEMS + i} tokenData={data} />
                  <Break />
                </Fragment>
              )
            }
            return null
          })}
          {/* <PageButtons>
            <Arrow
              onClick={() => {
                setPage(page === 1 ? page : page - 1)
              }}
            >
              <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
            </Arrow>
            <Text>{t('Page %page% of %maxPage%', { page, maxPage })}</Text>
            <Arrow
              onClick={() => {
                setPage(page === maxPage ? page : page + 1)
              }}
            >
              <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
            </Arrow>
          </PageButtons> */}
        </>
      ) : (
        <>
          <TableLoader />
          <Box />
        </>
      )}
    </TableWrapper>
  )
}

export default TrendingTable
