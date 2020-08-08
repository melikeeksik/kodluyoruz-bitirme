import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity ,PermissionsAndroid,Platform, Button} from "react-native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import ImagePicker from 'react-native-image-picker';



const ProfilInformation = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pictureUri,setPictureUri]=useState("")
  const userid = auth().currentUser.uid;
 
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const setUser = () => {
    database()
      .ref(`users/${userid}`)
      .update({
        name:name,
        surname:surname
      })
      .then(() => console.log("Data set."));
  };
  const selectPhoto =  async ()=>{
    
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.uri;
        console.log("uri",uri)
      setPictureUri(uri)
      console.log(pictureUri)
      }
    });
  }
  const myPress = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={{ padding: 40 }}>
      <TextInput
        onChangeText={(text) => setName(text)}
        
      ></TextInput>
      <TextInput
        onChangeText={(text) => setSurname(text)}
      
      ></TextInput>
      <TouchableOpacity onPress={setUser}>
        <Text>GÜNCELLE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={selectPhoto}>
        <Text>FOTO SEÇ</Text>
      </TouchableOpacity>
      <Button title ="izin" onPress={myPress}></Button>
    </View>
  );
};
export { ProfilInformation };
