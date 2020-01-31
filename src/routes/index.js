import React from "react";
import { Text } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Feed from "../Screens/Feed";

const MainNavigator = createStackNavigator(
  { Feed },
  {
    defaultNavigationOptions: {
      headerTitle: <Text>Teste</Text>
    }
  }
);

export default createAppContainer(MainNavigator);
