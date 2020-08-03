import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {
  const [usermail, setUserMail] = useState('');
  const [userpass, setPassword] = useState('');

  setMail = (text) => setUserMail(text);

  setPass = (text) => setPassword(text);

  const loginUser = async () => {
    try {
      await auth().signInWithEmailAndPassword(usermail, userpass);
      setPassword("")
      setUserMail("")
      props.navigation.navigate('DrawerMenu');
      AsyncStorage.setItem('@USER_ID', auth().currentUser.uid);
    } catch (error) {
      console.log(error);
      Alert.alert('MyApp', 'Bir hata oluştu.');
    }
  };

  return (
    <ImageBackground   style={styles.Login.Image}source={{uri:"https://i.pinimg.com/564x/78/f9/09/78f9091de9ac0d47467438b78b3fe3b0.jpg"}}>
      <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
     
        <TextInput
          style={styles.Login.input}
          placeholder="E-posta adresinizi giriniz.."
          placeholderTextColor="#424242"
          onChangeText={setMail}
          value={usermail}
          keyboardType="email-address"
          autoCapitalize="none"
          
        />

        <TextInput
          style={styles.Login.input}
          placeholder="Şifrenizi giriniz.."
          placeholderTextColor="#424242"
          onChangeText={setPass}
          value={userpass}
          secureTextEntry
        />

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.Login.button}
            onPress={loginUser}>
            <Text style={{color:"#424242"}}>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.Login.button}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text style={{color:"#424242"}}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};
const styles ={
  Login : StyleSheet.create({
    Image:{
      width:Dimensions.get("window").width,
      height:Dimensions.get("window").height
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: Dimensions.get("window").width,
      height: 60,
      borderRadius: 20,
      color: '#ffffff',
      margin:7,
  
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      height: 40,
      borderRadius: 20,
      margin:4
    
    }
  })
}
export {Login};