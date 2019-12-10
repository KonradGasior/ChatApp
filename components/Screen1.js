import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class Screen1 extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello Screen1</Text>
        <Button
          title="Go to Screen2"
          onPress={() => this.props.navigation.navigate("Screen2")}
        />
      </View>
    );
  }
}
