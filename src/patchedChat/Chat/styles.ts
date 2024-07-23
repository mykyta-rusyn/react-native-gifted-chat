import { createStyleSheet } from 'react-native-unistyles'

import { Theme } from '@newgen/general'

export const chatStyleSheet = createStyleSheet(({ colors }) => ({
  root: (height: number | undefined) => ({
    height,
    backgroundColor: colors.bgSecondary,
  }),
  list: {
    flexGrow: 1,
    paddingBottom: Theme.paddingSmall,
  },
}))

export const messageStyleSheet = createStyleSheet(({ colors }) => ({
  rootOuter: (isSameUser: boolean) => ({
    flex: 1,
    marginBottom: isSameUser ? Theme.borderRadius : Theme.paddingSmall,
    variants: {
      position: {
        left: {
          alignItems: 'flex-start',
          marginLeft: Theme.paddingSmall,
        },
        right: {
          alignItems: 'flex-end',
          marginRight: Theme.paddingSmall,
        },
      },
    },
  }),
  root: (withPrev: boolean, withNext: boolean) => ({
    borderWidth: 1,
    borderColor: colors.border,
    padding: Theme.paddingSmall,
    borderRadius: 15,
    backgroundColor: colors.bgPrimary,
    variants: {
      position: {
        left: {
          borderTopLeftRadius: withPrev ? 3 : 0,
          borderBottomLeftRadius: withNext ? 3 : 0,
        },
        right: {
          borderTopRightRadius: withPrev ? 3 : 0,
          borderBottomRightRadius: withNext ? 3 : 0,
        },
      },
    },
  }),
  message: {
    fontSize: Theme.scaleFont(16),
    color: colors.textTitle,
  },
}))

export const dayStyleSheet = createStyleSheet(({ colors }) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.borderRadius,
    marginBottom: Theme.paddingSmall,
  },
  day: {
    backgroundColor: 'transparent',
    color: colors.textDescription,
    fontSize: Theme.scaleFont(12),
    fontWeight: '600',
  },
}))

export const timeStyleSheet = createStyleSheet(({ colors }) => ({
  time: {
    fontSize: Theme.scaleFont(10),
    textAlign: 'right',
    color: colors.textDescription,
  },
}))
