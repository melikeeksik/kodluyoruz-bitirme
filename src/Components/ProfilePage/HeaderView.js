import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {Avatar, Icon} from 'react-native-elements';

const HeaderView = (props) => {
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        containerStyle={{height: 100, width: 100}}
        source={{
          uri: props.profileImg,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          marginLeft:20,
          marginTop:15
        }}>
        <Text style={styles.text}>{props.userName}</Text>

        <Text style={styles.text}>{props.userSurname}</Text>
      </View>

      {props.buttonVisible ? <Icon
      onPress={props.onPress}
      containerStyle={{marginTop:40, marginLeft:60}}
      name="update"/>:null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#fce4ff",
    width:Dimensions.get("window").width*0.8,
    alignSelf:"center",
    marginVertical:10,
    },
    text:{
      fontSize:30,
      fontWeight:"bold"
    }
});

export {HeaderView};
