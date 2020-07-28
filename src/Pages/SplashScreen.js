import React, { useEffect } from "react";
import { View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = (props) => {
  useEffect(() => {
    AsyncStorage.getItem("@USER_ID").then((res) => {
      if (res == null) props.navigation.navigate("Login");
      else props.navigation.navigate("DrawerMenu");
    });
  }, []);

  return <View></View>;
};
export { SplashScreen };
