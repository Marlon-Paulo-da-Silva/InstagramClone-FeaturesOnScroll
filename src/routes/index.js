import React from "react";
import { Text, Image } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Feed from "../Screens/Feed";

import logo from "../../assets/instagram.png";

const MainNavigator = createStackNavigator(
  { Feed },
  {
    defaultNavigationOptions: {
      headerTitle: <Image source={logo} />,
      headerStyle: {
        backgroundColor: "#f5f5f5"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
