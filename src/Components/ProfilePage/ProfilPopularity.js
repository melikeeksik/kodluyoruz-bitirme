import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProfilePopularity = (props) => {
  return (
    <View style={stlyes.container}>
      <Text>Ivır</Text>
      <Text>13555</Text>
    </View>
  );
};

const stlyes = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-evenly',
    alignItems:'center'
    
  },
});

export {ProfilePopularity};
