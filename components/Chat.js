import React, { Component } from "react";
import { View, Platform } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";

export default class Chat extends Component {
  state = {
    messages: []
  };
  // Initialize message Data:
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimge.com/140/140/any"
          }
        },
        {
          _id: 2,
          text: `Hello ${this.props.navigation.state.params.name}! You have entered the chat.`,
          createdAt: new Date(),
          system: true
        }
      ]
    });
  }
  // handle send actions:
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }
  // Edit bubble apperance:
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: "#000" } }}
      />
    );
  }
  // Passes user name given in the start screen to the title
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.name };
  };
  render() {
    return (
      // Wrapping component also using the background chosen at start screen
      <View
        style={
          ({ flex: 1, justifyContent: "center", alignItems: "center" },
          this.props.navigation.state.params.background)
        }
      >
        {/* chat component which allow to write and send messages */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{ _id: 1 }}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}
