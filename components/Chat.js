import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Chat extends Component {
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
      ></View>
    );
  }
}
