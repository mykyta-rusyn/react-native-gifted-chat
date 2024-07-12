import PropTypes from 'prop-types'

import { IMessage } from './Models'
import { isValid, isSameDay as isSameDayImpl } from 'date-fns'

export const StylePropType = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
  PropTypes.bool,
])

export function isSameDay(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  if (!diffMessage || !diffMessage.createdAt) {
    return false
  }

  if (!isValid(currentMessage.createdAt) || !isValid(diffMessage.createdAt)) {
    return false
  }
  return isSameDayImpl(currentMessage.createdAt, diffMessage.createdAt)
}

export function isSameUser(
  currentMessage: IMessage,
  diffMessage: IMessage | null | undefined,
) {
  return !!(
    diffMessage &&
    diffMessage.user &&
    currentMessage.user &&
    diffMessage.user._id === currentMessage.user._id
  )
}
