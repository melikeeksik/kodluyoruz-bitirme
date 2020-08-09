import React from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { Icon } from "react-native-elements";

const SearchBar = (props) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius:10,
        margin:7
      }}
    >
      <TextInput style={styles.textınput} onChangeText={props.onSearch} />
     
     <Icon name="search"  />
     
    </View>
  );
};

const styles = StyleSheet.create({
  textınput: {
    width: Dimensions.get("window").width * 0.9,
    height: 30,

    color: "#ffffff",
    margin: 7,
    marginLeft: 7,
  },
});

export { SearchBar };
