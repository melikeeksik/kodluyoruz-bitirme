import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Avatar} from 'react-native-elements';

const HeaderView = (props) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        containerStyle={{height: 125, width: 125}}
        source={{
          uri: props.profileImg,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          margin: 10,
        }}>
        <Text style={styles.text}>{props.userName}</Text>

        <Text style={styles.text}>{props.userSurname}</Text>
      </View>

      {props.buttonVisible ? <TouchableOpacity style={{alignSelf: "flex-end",marginLeft:10}} onPress={props.onPress}>
        <Text>Güncelle</Text>
      </TouchableOpacity>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#fce4ff",
    width:Dimensions.get("window").width*0.8,
    alignSelf:"center" 
    },
    text:{
      fontSize:30,
      fontWeight:"bold"
    }
});

export {HeaderView};
