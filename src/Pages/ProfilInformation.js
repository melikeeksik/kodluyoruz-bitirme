import React, {useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity,  ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-picker';

import {Input, Avatar, Accessory} from 'react-native-elements';

const ProfilInformation = (props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [loading, setLoading] = useState(false)
  const [imageRef, setImageRef] = useState('')
  const [image, setImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSaJYuY-73ZNnqxSZ5VMAKYhkwqd3y9hg76sQ&usqp=CAU',
  );
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
        name: name,
        surname: surname,
        email: auth().currentUser.email,
        profileImgRef: imageRef
      })
      .then(() => console.log('Data set.'));
  };
  const selectPhoto = async () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        let {uri} = source
        let index = uri.indexOf("images/") + 7
        let imageName = uri.slice(index)
        setImage(uri)
        setImageRef(imageName)
      }
    });
  };
  const uploadImage = async() => {
    setLoading(true)
    const uri = image
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    try {
      await storage().ref(filename).putFile(uploadUri);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    loading ? <View style={{flex:1, justifyContent:"center"}}>
      <ActivityIndicator
      size="large"
      color="blue"
    />
    </View>
    
    :<SafeAreaView style={{flex: 1}}>
    <View
      style={{
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Avatar
        containerStyle={{height: 150, width: 150}}
        source={{
          uri: image,
        }}>
        <Accessory onPress={selectPhoto} />
      </Avatar>

      <Input
        onChangeText={(text) => setName(text)}
        placeholder="İsim"
        value={name}></Input>
      <Input
        placeholder="Soyisim"
        value={surname}
        onChangeText={(text) => setSurname(text)}></Input>
      <TouchableOpacity

        onPress={() => {
          uploadImage().then(()=>{
            setUser();
            setLoading(false)
            props.navigation.goBack();
          })
        }}>
        <Text>GÜNCELLE</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  );
};
export {ProfilInformation};
