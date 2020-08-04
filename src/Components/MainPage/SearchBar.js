import React from "react";
import {View, TextInput, StyleSheet ,Dimensions} from "react-native";

const SearchBar = (props) => {
  return (
    <View >
      <TextInput style={styles.textınput} onChangeText={props.onSearch} />
    </View>
  );
};


const styles = StyleSheet.create({
 
  textınput: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    width: Dimensions.get("window").width,
    height: 60,
    borderRadius: 20,
    color: "#ffffff",
    margin: 7,
    marginLeft:7
  },
})

export { SearchBar };