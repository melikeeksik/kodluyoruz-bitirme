import React from "react";
import {View, TextInput, StyleSheet } from "react-native";

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <TextInput onChangeText={props.onSearch} />
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    backgroundColor: "#ff616f",
    margin: 10,
    paddingLeft: 10,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
})

export { SearchBar };