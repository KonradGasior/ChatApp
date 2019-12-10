import React from "react";
// Import screens to navigate to:
import Start from "./components/Start";
import Chat from "./components/Chat";
// Screem navigatior imports:
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// Screen navigation
const navigator = createStackNavigator({
  Start: { screen: Start },
  Chat: { screen: Chat }
});

const navigatorContainer = createAppContainer(navigator);

export default navigatorContainer;
