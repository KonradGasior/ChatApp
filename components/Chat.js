import React, { Component } from "react";
import {
  View,
  Platform,
  Text,
  StyleSheet,
  AsyncStorage,
  NetInfo
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import KeyboardSpacer from "react-native-keyboard-spacer";
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

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
      isConnected: false,
      messages: [],
      user: {
        _id: 0,
        name: "",
        avatar: ""
      },
      loggedInText: "please wait..."
    };
  }

  // uses local storage to fetch latest messages:1
  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("message")) || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || null,
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null
    });
  }

  // Delete stored messages:
  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("message");
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle changes of data:
  onCollectionUpdate = querySnapshot => {
    const messages = [];
    querySnapshot.forEach(doc => {
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image || null,
        location: data.location
      });
    });
    this.setState({
      messages
    });
  };

  componentDidMount() {
    // check connection status:
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected == true) {
        console.log("online");
        // referene to database:
        this.setState({
          isConnected: true
        });
        this.unsubscribeUser = firebase
          .auth()
          .onAuthStateChanged(async user => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            // create db reference
            this.referenceMessages = firebase.firestore().collection("message");
            // set User:
            this.setState({
              user: {
                _id: user.uid,
                name: this.props.navigation.state.params.name,
                avatar: "https://placeimg.com/140/140/any"
              },
              loggedInText: "Hello there!"
            });
            // snapshot data:
            this.unsubscribe = this.referenceMessages.onSnapshot(
              this.onCollectionUpdate
            );
          });
      } else {
        console.log("offline");
        this.getMessages();
      }
    });
  }
  componentWillUnmount() {
    // stop listening to data changes:
    this.unsubscribe();
    this.unsubscribeUser();
  }

  // save message to the database:
  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        "message",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle send actions:
  onSend = (messages = []) => {
    this.setState(
      previousState => ({
        messages: GiftedChat.append(previousState.messages, messages)
      }),
      () => {
        this.addMessage();
        this.saveMessages();
      }
    );
  };

  // Edit bubble apperance:
  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: "#fff" } }}
      />
    );
  };

  // check if should render input toolbar:
  renderInputToolbar = props => {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  };
  // Custom actions:
  renderCustomActions = props => {
    return <CustomActions {...props} />;
  };

  //
  renderCustomView = props => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      );
    }
    return null;
  };
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
          renderCustomView={this.renderCustomView.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          messages={this.state.messages}
          onSend={(messages = []) => this.onSend(messages)}
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
