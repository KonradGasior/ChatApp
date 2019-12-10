import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Screen1 extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello Screen2</Text>
      </View>
    );
  }
}
