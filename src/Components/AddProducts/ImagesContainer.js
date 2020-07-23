import React, {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';

import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import database from '@react-native-firebase/database';

const options = {
  title: 'Add Products Photo',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const ImagesContainer = (props) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("")

  const pickPhoto = () => {
    //alert('clicked');
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        let cpArray = images.concat(source);
        setImages(cpArray);
      }
    });
  };

  const sendInformations = () => {
    database()
      .ref('/products')
      .push({
        name: 'Ada Lovelace',
        images,
        description: {description}
      })
      .then(() => {
          setDescription("")
          setImages([])
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>ürün adı burada</Text>
          <Icon style={{paddingLeft: 10}} name="camera" onPress={pickPhoto} />
        </View>
        <SliderBox images={images} />
        <TextInput
          style={{backgroundColor: 'green'}}
          placeholder="Ürün açıklaması.."
          onChangeText={(text)=>setDescription(text)}
          multiline={true}
          value={description}
          textAlignVertical="top"
          numberOfLines={10}
        />
      </View>
      <Button title="Gönder" onPress={sendInformations}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: 'center',
    fontSize: 18,
  },
});

export {ImagesContainer};
