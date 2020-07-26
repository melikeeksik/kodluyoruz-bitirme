import React, {useState} from 'react';
import {SliderBox} from 'react-native-image-slider-box';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';

import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

import storage from '@react-native-firebase/storage';
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

//dummy variable
const name = "xxxx"

  const [images, setImages] = useState([]);
  const [imagesName, setImagesName] = useState([])
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
        let {uri} = source
        let index = uri.indexOf("images/") + 7
        let imageName = uri.slice(index)
        
        let cpArrayNames = imagesName.concat(imageName)
        let cpArray = images.concat(source);
        
        console.log(imageName)
        setImagesName(cpArrayNames)
        setImages(cpArray);
      }
    });
  };
  const uploadImage =(images) => {
    images.forEach( async ({uri})=>{

    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    console.log(uploadUri)
    

    try {
      await storage().ref(filename).putFile(uploadUri);
      setImages([])
      setImagesName([])
    } catch (e) {
      console.error(e);
    }

    })
  }

  function sendInformations (name,imagesName,description) {
    database()
      .ref('/products')
      .push({
        name,
        imagesName,
        description
      })
      .then(() => {
          uploadImage(images)
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
      <Button title="Gönder" onPress={()=>{
        sendInformations(name,imagesName,description)
      }}/>
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
