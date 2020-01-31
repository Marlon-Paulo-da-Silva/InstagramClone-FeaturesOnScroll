import React from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Feed from "../Screens/Feed";

import camera from "../../assets/camera.png";
import logo from "../../assets/logo.png";
import igtv from "../../assets/igtv.png";
import send from "../../assets/send.png";

const MainNavigator = createStackNavigator(
  { Feed },
  {
    defaultNavigationOptions: {
      headerTitle: () => <Image source={logo} />,
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 20 }}>
          <Image source={camera} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image source={igtv} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image source={send} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#f5f5f5"
      }
    }
  }
);

export default createAppContainer(MainNavigator);
