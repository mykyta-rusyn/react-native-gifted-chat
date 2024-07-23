export const TicketScreen: NavFC<'Ticket'> = ({ route }) => {
  const { styles, theme } = useStyles(styleSheet)
  const [ticket] = useState(defaultTicket)
  const [messages, setMessages] = useState(ticket.messages)
  const [userId] = useState(userState.user!.id)

  const keyboardHeight = useRef(0)
  const maxHeight = useRef(UnistylesRuntime.screen.height)
  const isFirstLayout = useRef(true)

  const [isInitialized, setIsInitialized] = useState(false)
  const [inputHeight, setInputHeight] = useState(minInputHeight)
  const [chatHeight, setChatHeight] = useState<number>()

  function getBaseChatHeight(newInputHeight = inputHeight) {
    return (
      maxHeight.current -
      newInputHeight -
      (theme.paddingBottom + Theme.paddingMedium)
    )
  }

  function getChatHeightWithKeyboard(newInputHeight = inputHeight) {
    return (
      getBaseChatHeight(newInputHeight) -
      keyboardHeight.current +
      theme.paddingBottom
    )
  }

  function onSend(text: string) {
    const message: TicketMessage = {
      createdAt: Date.now(),
      id: nextId(),
      text,
      ticket_id: route.params.ticketId,
      userId,
    }

    setMessages(prev => [message, ...prev])
    resetInputToolbar()
  }

  function resetInputToolbar() {
    setInputHeight(minInputHeight)
    setChatHeight(getChatHeightWithKeyboard(minInputHeight))
  }

  function onInputSizeChanged(height: number) {
    const newInputHeight = Math.max(
      minInputHeight,
      Math.min(maxInputHeight, height),
    )

    setInputHeight(newInputHeight)
    setChatHeight(getChatHeightWithKeyboard(newInputHeight))
  }

  function onInitialLayout(e: LayoutChangeEvent) {
    maxHeight.current = e.nativeEvent.layout.height
    setIsInitialized(true)
  }

  function onMainLayout(e: LayoutChangeEvent) {
    // TODO: fix an issue when keyboard is dismissing during the initialization
    const { height } = e.nativeEvent.layout

    if (maxHeight.current !== height || isFirstLayout.current) {
      isFirstLayout.current = false
      maxHeight.current = height

      setChatHeight(
        keyboardHeight.current > 0
          ? getChatHeightWithKeyboard()
          : getBaseChatHeight(),
      )
    }
  }

  useEffect(() => {
    function onShow(e: KeyboardEvent) {
      if (keyboardHeight.current !== e.endCoordinates.height) {
        keyboardHeight.current = e.endCoordinates.height
      }

      setChatHeight(getChatHeightWithKeyboard())
    }
    function onHide() {
      setChatHeight(getBaseChatHeight())
    }

    const willShow = Keyboard.addListener('keyboardWillShow', onShow)
    const willHide = Keyboard.addListener('keyboardWillHide', onHide)
    const didShow = Keyboard.addListener('keyboardDidShow', e => {
      if (isAndroid) {
        onShow(e)
      }
    })
    const didHide = Keyboard.addListener('keyboardDidHide', () => {
      if (isAndroid) {
        onHide()
      }
    })

    return () => {
      willShow.remove()
      willHide.remove()
      didShow.remove()
      didHide.remove()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isInitialized === true) {
    return (
      <View style={Theme.styles.flex1} onLayout={onMainLayout}>
        <KeyboardAvoidingView style={styles.root}>
          <Chat height={chatHeight} messages={messages} />
          <ChatInput
            height={inputHeight}
            onInputSizeChanged={onInputSizeChanged}
            onSend={onSend}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }

  return (
    <View style={Theme.styles.flex1Center} onLayout={onInitialLayout}>
      <ActivityIndicator color={theme.colors.textTitle} />
    </View>
  )
}
