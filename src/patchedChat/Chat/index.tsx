import {createRef, FC, useEffect, useState} from 'react';
import {FlatList, ListRenderItemInfo, View} from 'react-native';
import {UnistylesRuntime, useStyles} from 'react-native-unistyles';

import {keyExtractor, ThemeName, TicketMessage} from '@newgen/general';
import {userState} from '@newgen/main';

import {Message} from './Message';
import {chatStyleSheet} from './styles';

type Props = {
  height: number | undefined;
  messages: TicketMessage[];
};

export const Chat: FC<Props> = (props) => {
  const {styles} = useStyles(chatStyleSheet);
  const userId = userState.user!.id;
  const [listRef] = useState(createRef<FlatList<TicketMessage>>);

  function renderMessage({item, index}: ListRenderItemInfo<TicketMessage>) {
    const previousMessage = props.messages[index + 1];
    const nextMessage = props.messages[index - 1];

    return (
      <Message
        message={item}
        nextMessage={nextMessage}
        position={item.userId === userId ? 'right' : 'left'}
        previousMessage={previousMessage}
      />
    );
  }

  useEffect(() => {
    listRef.current?.scrollToOffset({offset: 0, animated: true});
  }, [listRef, props.messages.length]);

  return (
    <View style={styles.root(props.height)}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={styles.list}
        data={props.messages}
        indicatorStyle={
          (UnistylesRuntime.themeName as ThemeName) === 'dark'
            ? 'white'
            : 'black'
        }
        inverted={true}
        keyExtractor={keyExtractor}
        ref={listRef}
        renderItem={renderMessage}
      />
    </View>
  );
};
