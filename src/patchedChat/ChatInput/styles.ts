import { createStyleSheet } from 'react-native-unistyles'

import { Theme } from '@newgen/general'

const sendSize = Theme.scaleSize(24)

export const minInputHeight = Theme.scaleSize(24)
export const maxInputHeight = Theme.scaleSize(200)

export const styleSheet = createStyleSheet(({ colors }) => ({
  root: (position: 'absolute' | 'relative') => ({
    position,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Theme.borderRadius,
    borderTopWidth: 1,
    backgroundColor: colors.bgPrimary,
    borderColor: colors.border,
    bottom: 0,
    padding: Theme.paddingSmall,
  }),
  input: (height: number) => ({
    height,
    flex: 1,
    fontSize: Theme.scaleFont(16),
    lineHeight: Theme.scaleFont(16),
    color: colors.textTitle,
  }),
  send: (disabled: boolean) => ({
    opacity: disabled ? 0.5 : 1,
    height: sendSize,
    width: sendSize,
    tintColor: colors.textTitle,
  }),
}))
