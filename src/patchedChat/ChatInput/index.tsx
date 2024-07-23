import { FC, useEffect, useRef, useState } from 'react'
import {
  Image,
  Keyboard,
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  View,
} from 'react-native'
import { UnistylesRuntime, useStyles } from 'react-native-unistyles'

import { localize, Opacity, Theme } from '@newgen/general'

import { minInputHeight, styleSheet } from './styles'

export { maxInputHeight, minInputHeight } from './styles'

type Props = {
  height: number
  onInputSizeChanged: (height: number) => void
  onSend: (text: string) => void
}

const sendImage = require('./res/send.png')

export const ChatInput: FC<Props> = props => {
  const { styles, theme } = useStyles(styleSheet)
  const [position, setPosition] = useState<'absolute' | 'relative'>('absolute')
  const height = useRef(minInputHeight)
  const [text, setText] = useState('')
  const sendDisabled = text.trim().length === 0

  function onContentSizeChange(
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) {
    //container have padding
    const newHeight = event.nativeEvent.contentSize.height + Theme.paddingSmall

    if (height.current !== newHeight) {
      height.current = newHeight + Theme.paddingSmall
      props.onInputSizeChanged(height.current)
    }
  }

  function onSend() {
    props.onSend(text.trim())
    setText('')
  }

  useEffect(() => {
    const willShow = Keyboard.addListener('keyboardWillShow', () =>
      setPosition('relative'),
    )
    const willHide = Keyboard.addListener('keyboardWillHide', () =>
      setPosition('absolute'),
    )
    return () => {
      willShow.remove()
      willHide.remove()
    }
  }, [])

  return (
    <View style={styles.root(position)}>
      <TextInput
        multiline
        keyboardAppearance={UnistylesRuntime.themeName}
        placeholder={localize('ticketScreen_placeholder')}
        placeholderTextColor={theme.colors.textDescription}
        style={styles.input(props.height)}
        value={text}
        onChangeText={setText}
        onContentSizeChange={onContentSizeChange}
      />
      <Opacity disabled={sendDisabled} onPress={onSend}>
        <Image source={sendImage} style={styles.send(sendDisabled)} />
      </Opacity>
    </View>
  )
}
