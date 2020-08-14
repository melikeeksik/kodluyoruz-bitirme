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
      <TextInput style={styles.textinput} onChangeText={props.onSearch} />
     
     <Icon name="search"  
     iconStyle={{marginRight:20}}/>
     
    </View>
  );
};

const styles = StyleSheet.create({
  textinput: {
    width: Dimensions.get("window").width * 0.9,
    height: 30,
    color: "black",
    margin: 7,
    paddingLeft:10
  },
});

export { SearchBar };
