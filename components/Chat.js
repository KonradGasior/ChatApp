import React, { Component } from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";

// Firebase setup:
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAVjHtROl84k687JTDKQ0DMzAnT-AvTwi4",
        authDomain: "messagesdb-1988f.firebaseapp.com",
        databaseURL: "https://messagesdb-1988f.firebaseio.com",
        projectId: "messagesdb-1988f",
        storageBucket: "messagesdb-1988f.appspot.com",
        messagingSenderId: "209781076565"
      });
    }

    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
        avatar: ""
      },
      loggedInText: "please wait..."
    };
  }

  componentDidMount() {
    // referene to database:
    this.referenceMessages = firebase.firestore().collection("message");
    this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      // set User:
      this.setState({
        user: {
          _id: user.uid,
          name: this.props.navigation.state.params.name,
          avatar: "https://placeimg.com/140/140/any"
        },
        loggedInText: "Hello there!"
      });
    });

    // snapshot data:
    this.unsubscribe = this.referenceMessages.onSnapshot(
      this.onCollectionUpdate
    );
  }
  componentWillUnmount() {
    // stop listening to data changes:
    this.unsubscribe();
  }
  // handle send actions:
  onSend(messages = []) {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
      }
    );
  }

  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user
    });
  }

  // handle changes of data:
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user
      });
    });
    this.setState({
      messages
    });
  };

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
        <Text style={styles.loginText}>{this.state.loggedInText}</Text>
        {/* chat component which allow to write and send messages */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
        />
        {Platform.OS === "android" ? <KeyboardSpacer /> : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loginText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  }
});
