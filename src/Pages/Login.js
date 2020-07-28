import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
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
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextInput
          style={{
            color: 'white',
            margin: 5,
            marginVertical: 10,
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#bdbdbd',
          }}
          placeholder="E-posta adresinizi giriniz.."
          placeholderTextColor="white"
          onChangeText={setMail}
          value={usermail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={{
            color: 'white',
            margin: 5,
            marginVertical: 10,
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#bdbdbd',
          }}
          placeholder="Şifrenizi giriniz.."
          placeholderTextColor="white"
          onChangeText={setPass}
          value={userpass}
          secureTextEntry
        />

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 5,
              alignItems: 'center',
            }}
            onPress={loginUser}>
            <Text>Giriş Yap</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 5,
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('Signup')}>
            <Text>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Login};