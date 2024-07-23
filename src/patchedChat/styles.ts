import { createStyleSheet } from 'react-native-unistyles'

export const styleSheet = createStyleSheet(({ colors, paddingBottom }) => ({
  root: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
    marginBottom: paddingBottom,
  },
}))
