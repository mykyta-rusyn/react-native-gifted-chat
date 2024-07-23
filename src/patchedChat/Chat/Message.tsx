import { FC, memo } from 'react'
import {
  Linking,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle,
  View,
} from 'react-native'
import ContextMenu, {
  ContextMenuAction,
  ContextMenuOnPressNativeEvent,
} from 'react-native-context-menu-view'
import { openComposer } from 'react-native-email-link'
import ParsedText, { ParseShape } from 'react-native-parsed-text'
import { useStyles } from 'react-native-unistyles'

import {
  isAndroid,
  Opacity,
  showLinkAlert,
  TicketMessage,
} from '@newgen/general'

import { Day } from './Day'
import { messageStyleSheet } from './styles'
import { Time } from './Time'
import { isSameDay, isSameUser } from './utils'

type Props = {
  message: TicketMessage
  nextMessage: TicketMessage | undefined
  position: 'left' | 'right'
  previousMessage: TicketMessage | undefined
}

export const Message: FC<Props> = memo(
  ({ message, nextMessage, position, previousMessage }) => {
    const { styles } = useStyles(messageStyleSheet, { position })
    const sameUser = isSameUser(message.userId, nextMessage?.userId)

    let withNext = false
    let withPrev = false
    if (sameUser) {
      withNext = isSameDay(message.createdAt, nextMessage?.createdAt)
      withPrev = isSameDay(message.createdAt, previousMessage?.createdAt)
    }

    function onPress() {}

    function onLongPress(
      e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>,
    ) {
      console.log({ event: e.nativeEvent })
    }

    return (
      <View style={styles.rootOuter(sameUser)}>
        <Day
          currentCreatedAt={message.createdAt}
          previousCreatedAt={previousMessage?.createdAt}
        />
        <ContextMenu
          actions={longPressActions}
          title='context menu title'
          onPress={onLongPress}
        >
          <Opacity style={styles.root(withNext, withPrev)} onPress={onPress}>
            <ParsedText parse={patterns} style={styles.message}>
              {message.text}
            </ParsedText>
            <Time createdAt={message.createdAt} />
          </Opacity>
        </ContextMenu>
      </View>
    )
  },
  (prev, next) =>
    next.message.createdAt !== prev.message.createdAt ||
    next.message.text !== prev.message.text ||
    prev.previousMessage !== next.previousMessage ||
    next.nextMessage !== prev.nextMessage,
)

const longPressActions: ContextMenuAction[] = [
  { title: 'destructive action', destructive: true },
  { title: 'disabled action', disabled: true },
  { title: 'selected action', selected: true },
  { title: 'subtitle action', subtitle: 'subtitle' },
  {
    title: 'subactions action',
    actions: [{ title: 'first subaction' }, { title: 'second subaction' }],
  },
  {
    title: 'subactions inlined action',
    actions: [
      { title: 'first subaction inlined' },
      { title: 'second inlined subaction' },
    ],
    inlineChildren: true,
  },
]

const linkStyle: StyleProp<TextStyle> = {
  color: 'white',
  textDecorationLine: 'underline',
}

const patterns: ParseShape[] = [
  { type: 'email', onPress: openEmail, style: linkStyle },
  { type: 'phone', onPress: openPhone, style: linkStyle },
  { type: 'url', onPress: openUrl, style: linkStyle },
]

function openEmail(to: string): void {
  openComposer({ to }).catch(() => showLinkAlert(to))
}

function openPhone(phone: string): void {
  let url
  if (isAndroid) {
    url = 'tel:'
  } else {
    url = 'telprompt:'
  }
  url += phone

  Linking.openURL(url)
}

const wwwUrlPattern = /^www\./i

function openUrl(url: string): void {
  // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
  // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
  if (wwwUrlPattern.test(url)) {
    openUrl(`https://${url}`)
  } else {
    Linking.openURL(url).catch(() => showLinkAlert(url))
  }
}
