import React from 'react';
import {Modal, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';

const ImgModal = (props) => {
  return (
    <SafeAreaView>
      <Modal animationType="fade" visible={props.visible}>
        <Icon 
        containerStyle={{marginLeft:5,alignSelf:"flex-end"}}
        iconStyle={{height:30,width:30, marginTop:50,marginRight:20}}
        name="close"
        onPress={props.onPress}
        />
        <Image style={styles.image} source={{uri: props.imgUrl}} />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});

export {ImgModal};
