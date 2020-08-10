import React, {useState} from 'react';
import {
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';

import ImagePicker from 'react-native-image-picker';
import { Input } from "react-native-elements";

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
  const [image, setImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRY2UtYWrjvpjBQi0_1Jy6JHJv50KTV6JH0RA&usqp=CAU',
  );
  const [imageRef, setImageRef] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [imagePicked, setImagePicked] = useState(false);
  const [sendEnable, setSendEnable] = useState(true);

  const userEmail = auth().currentUser.email;

  React.useEffect(() => {
    if (title != '' && description != '' && imagePicked == true) {
      setSendEnable(false);
    } else {
      setSendEnable(true);
    }
  }, [title, description, imagePicked, sendEnable]);

  const pickPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        let {uri} = source;
        let index = uri.indexOf('images/') + 7;
        let imageName = uri.slice(index);
        setImage(uri);
        setImageRef(imageName);
      }
    });
    setImagePicked(true);
  };

  function uploadInformations(userEmail, imageRef, description, title) {
    database()
      .ref('/products')
      .push({
        userEmail,
        imageRef,
        description,
        title,
      })
      .then(() => {
        uploadImage(image);
        setImage(
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRY2UtYWrjvpjBQi0_1Jy6JHJv50KTV6JH0RA&usqp=CAU',
        );
        setImageRef('');
        setImagePicked(false);
      });
  }

  const uploadImage = async () => {
    const uri = image;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    setDescription('');
    setTitle('');
    setImagePicked(false);
    try {
      await storage().ref(filename).putFile(uploadUri);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-evenly'}}>
      <Image
        style={{width: 250, height: 250, alignSelf: 'center', marginBottom: 25}}
        source={{uri: image}}
      />
      <View>
        <Text style={{padding: 10, fontSize:20,alignSelf:"center"}}>Ürün başlığı</Text>

        <Input
          placeholder="Açıklayıcı başlıklar daha dikkat çeker..."
          onChangeText={(text) => setTitle(text)}
          value={title}
          containerStyle={styles.AddProduct.ınput}
        />
      </View>
      <View>
        <Text style={{padding: 10, fontSize:20,alignSelf:"center"}}>Detayları ekle</Text>
        <Input
        maxLength={50}
          numberOfLines={5}
          multiline={true}
          placeholder="Ürün için alakalı bir detay gir..."
          onChangeText={(text) => setDescription(text)}
          value={description}
          containerStyle={styles.AddProduct.input}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <TouchableOpacity onPress={pickPhoto} style={styles.AddProduct.buton}>
          <Text style={{fontWeight:"bold"}}>GÖRSEL SEÇ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.AddProduct.buton}
          disabled={sendEnable}
          onPress={() => {
            uploadInformations(userEmail, imageRef, description, title);
            setImagePicked(false);
          }}>
          <Text style={{fontWeight:"bold"}}>YÜKLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = {
  AddProduct: StyleSheet.create({
    input: {
      width:Dimensions.get("window").width * 0.9,

    },
    buton: {
      width: 100,
      backgroundColor: 'white',
      height: 40,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
};

export {ImagesContainer};
