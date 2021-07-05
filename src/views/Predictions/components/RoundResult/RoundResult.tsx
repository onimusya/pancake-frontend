import React from 'react'
import { BoxProps, Flex, Text } from '@pancakeswap/uikit'
import { BetPosition, NodeRound } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { formatUsdv2 } from '../../helpers'
import PositionTag from '../PositionTag'
import { LockPriceRow, PrizePoolRow, RoundResultBox } from './styles'

interface RoundResultProps extends BoxProps {
  round: NodeRound
  hasFailed?: boolean
}

const RoundResult: React.FC<RoundResultProps> = ({ round, hasFailed = false, children, ...props }) => {
  const { lockPrice, closePrice, totalAmount } = round
  const betPosition = closePrice.gt(lockPrice) ? BetPosition.BULL : BetPosition.BEAR
  const isPositionUp = betPosition === BetPosition.BULL
  const { t } = useTranslation()
  const priceDifference = closePrice.sub(lockPrice)

  return (
    <RoundResultBox betPosition={betPosition} {...props}>
      <Text color="textSubtle" fontSize="12px" bold textTransform="uppercase" mb="8px">
        {t('Closed Price')}
      </Text>
      {hasFailed ? (
        <Text bold textTransform="uppercase" color="textDisabled" mb="16px" fontSize="24px">
          {t('Canceled')}
        </Text>
      ) : (
        <Flex alignItems="center" justifyContent="space-between" mb="16px">
          <Text color={isPositionUp ? 'success' : 'failure'} bold fontSize="24px">
            {formatUsdv2(closePrice)}
          </Text>
          <PositionTag betPosition={betPosition}>{formatUsdv2(priceDifference)}</PositionTag>
        </Flex>
      )}
      {lockPrice && <LockPriceRow lockPrice={lockPrice} />}
      <PrizePoolRow totalAmount={totalAmount} />
      {children}
    </RoundResultBox>
  )
}

export default RoundResult
