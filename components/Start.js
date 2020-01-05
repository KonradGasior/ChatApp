import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  StyleSheet
} from "react-native";

// react class is showing input field where user can
// inuput his name and navigate to the second screen
// using button provided and the name given will be
// the account name displayed in the top left corner:
export default class Start extends Component {
  state = {
    name: "",
    background: styles.backgroundColor2
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/background.png")}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={styles.appTitle}>Chat App</Text>
        <View style={styles.wrapper}>
          {/* here user input username */}
          <TextInput
            style={styles.yourName}
            placeholder="Your Name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          {/* buttons responsible for updating state with backgorund color */}
          <Text>Choose Background Color</Text>
          <View style={styles.backgroundButtons}>
            <TouchableOpacity
              accessibilityLabel="Chose black background color"
              accessibilityRole="button"
              style={styles.background1}
              onPress={() =>
                this.setState({ background: styles.backgroundColor1 })
              }
            ></TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Chose dark-brown background color"
              accessibilityRole="button"
              style={styles.background2}
              onPress={() =>
                this.setState({ background: styles.backgroundColor2 })
              }
            ></TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Chose grey background color"
              accessibilityRole="button"
              style={styles.background3}
              onPress={() =>
                this.setState({ background: styles.backgroundColor3 })
              }
            ></TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel="Chose light-green background color"
              accessibilityRole="button"
              style={styles.background4}
              onPress={() =>
                this.setState({ background: styles.backgroundColor4 })
              }
            ></TouchableOpacity>
          </View>
          {/* Button navigate to the second screen */}
          <TouchableOpacity
            accessibilityLabel="Go to chat"
            accessibilityRole="button"
            style={styles.startChating}
            title="Go to Chat"
            onPress={() =>
              this.props.navigation.navigate("Chat", {
                name: this.state.name,
                background: this.state.background
              })
            }
          >
            <Text style={styles.startChatingText}>Go to Chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    width: 350,
    height: 200,
    padding: 10
  },
  background1: {
    backgroundColor: "#090C08",
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  backgroundColor1: {
    backgroundColor: "#090C08",
    width: "100%",
    height: "100%"
  },
  background2: {
    backgroundColor: "#474056",
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  backgroundColor2: {
    backgroundColor: "#474056",
    width: "100%",
    height: "100%"
  },
  background3: {
    backgroundColor: "#8A95A5",
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  backgroundColor3: {
    backgroundColor: "#8A95A5",
    width: "100%",
    height: "100%"
  },
  background4: {
    backgroundColor: "#B9C6AE",
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF",
    margin: 5,
    width: 30,
    height: 30,
    borderRadius: 15
  },
  backgroundColor4: {
    backgroundColor: "#B9C6AE",
    width: "100%",
    height: "100%"
  },
  startChating: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#757083",
    width: "90%",
    height: 50,
    margin: 10
  },
  yourName: {
    borderWidth: 2,
    borderColor: "#757083",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 0.5,
    padding: 10,
    marginBottom: 10
  },
  appTitle: {
    marginBottom: 40,
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "600"
  },
  backgroundButtons: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 40
  },
  startChatingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF"
  }
});
