import { FC } from 'react'
import { Text, View } from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { format, isSameDay } from 'date-fns'

import { dayStyleSheet } from './styles'

type Props = {
  currentCreatedAt: number
  previousCreatedAt: number | undefined
}

const dateFormat = 'MMM LL, uuuu'

export const Day: FC<Props> = ({ currentCreatedAt, previousCreatedAt }) => {
  const { styles } = useStyles(dayStyleSheet)

  if (
    previousCreatedAt === undefined ||
    isSameDay(currentCreatedAt, previousCreatedAt)
  ) {
    return null
  }

  return (
    <View style={styles.root}>
      <Text style={styles.day}>{format(currentCreatedAt, dateFormat)}</Text>
    </View>
  )
}
