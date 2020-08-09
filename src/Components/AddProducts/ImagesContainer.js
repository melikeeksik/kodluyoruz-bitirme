import React, { useState } from "react"
import {SafeAreaView, Image, Text, Button, Alert, View,StyleSheet,Dimensions} from "react-native"



import auth from "@react-native-firebase/auth"
import database from "@react-native-firebase/database"
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-picker';
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";



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

  function uploadInformations(userEmail, imageRef, description,title,date){
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
    <SafeAreaView  >
      <View style={{ paddingTop:60,paddingLeft:10,paddingRight:10 }}>
      <Text style={{padding:10}}>Soru başlığı</Text>
     
      <TextInput
      placeholder="Açılayıcı başlıklar daha dikkat çeker..."
      onChangeText={(text)=>setTitle(text)}
      value={title}
      style={styles.AddProduct.ınput}
      />
      <Text style={{padding:10}}>Detayları ekle</Text>
      <TextInput
      placeholder="Ürün için alakalı bir detay gir..."
      onChangeText={(text)=>setDescription(text)}
      value={description}
      style={styles.AddProduct.ınput}
      
      />
      <View style={{justifyContent:"center",alignItems:"center",padding:10}}>
      <TouchableOpacity onPress = {pickPhoto} style={styles.AddProduct.buton}>
       <Text style={{padding:10}}>GÖRSEL SEÇ</Text>
      </TouchableOpacity>
      
      </View>
      <View style={{justifyContent:"center",alignItems:"center",padding:10}}>
      <TouchableOpacity 
      style={styles.AddProduct.buton}
     
      onPress = {()=>{
        uploadInformations(userEmail,imageRef, description,title)
      }}>
        <Text>GÖNDER</Text>
      </TouchableOpacity>
      </View>

      <Image
      style={{width:100,height:100}}
      source={{uri:image}}
      />
      </View>
    </SafeAreaView>
  )
}
const styles ={
  AddProduct : StyleSheet.create({
    ınput : {borderBottomWidth:0.5,padding:10,margin:10},
    buton:{
      width:Dimensions.get("window").width/2,
      backgroundColor:"#fce4ec",
      height:40,
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center",

    }
  }
  )
}

export {ImagesContainer};
