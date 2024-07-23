import { FC } from 'react'
import { Text } from 'react-native'
import { useStyles } from 'react-native-unistyles'

import { format } from 'date-fns'

import { timeStyleSheet } from './styles'

type Props = {
  createdAt: number
}

const timeFormat = 'H:mm'

export const Time: FC<Props> = ({ createdAt }) => {
  const { styles } = useStyles(timeStyleSheet)

  return <Text style={styles.time}>{format(createdAt, timeFormat)}</Text>
}
