import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Chat extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.name };
  };
  render() {
    return (
      <View
        style={
          ({ flex: 1, justifyContent: "center", alignItems: "center" },
          this.props.navigation.state.params.background)
        }
      ></View>
    );
  }
}
