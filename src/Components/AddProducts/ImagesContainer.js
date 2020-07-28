import React, { useState } from "react"
import {SafeAreaView, Image, Text, Button, Alert} from "react-native"

import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-picker';
import { TextInput } from "react-native-gesture-handler";


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

  const [image, setImage] = useState("https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg")
  const [imageRef, setImageRef] = useState("")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")

  const userEmail = auth().currentUser.email
  const pickPhoto = () => {
    //alert('clicked');
    ImagePicker.showImagePicker(options, (response) => {
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
        setImage(uri)
        setImageRef(imageName)
      }
    });
  };

  function uploadInformations(userEmail, imageRef, description,title){
    database().ref("/products").push({
      userEmail,
      imageRef,
      description,
      title
    }).then(()=>{
      uploadImage(image)
      setImage("https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg")
      setImageRef("")
    })
  }

  const uploadImage = async() => {
    const uri = image
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    console.log(uploadUri)
    setDescription("")
    setTitle("")
    try {
      await storage().ref(filename).putFile(uploadUri);
    } catch (e) {
      console.error(e);
    }
  }

  return(
    <SafeAreaView>
      <Button
      title = "İlk Bunu Çalıştır"
      onPress = {pickPhoto}
      />
      <TextInput
      placeholder="Başlık Buraya"
      onChangeText={(text)=>setTitle(text)}
      value={title}
      />
      <TextInput
      placeholder="Tanım Burara"
      onChangeText={(text)=>setDescription(text)}
      value={description}
      />
      <Button
      title = "Upload Information"
      onPress = {()=>{
        uploadInformations(userEmail,imageRef, description,title)
      }}
      />

      <Image
      style={{width:100,height:100}}
      source={{uri:image}}
      />
    </SafeAreaView>
  )
}

export {ImagesContainer};
