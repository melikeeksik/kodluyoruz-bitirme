import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = (props) => {
  const [usermail, setUserMail] = useState('');
  const [userpass, setPassword] = useState('');
 
  const [userpassRep, setPasswordRep] = useState('');

  const setMail = (text) => setUserMail(text);

  const setPass = (text) => setPassword(text);
  

  const setPassRep = (text) => setPasswordRep(text);

  const signUser = async () => {
    if (userpass === userpassRep) {
      try {
        await auth().createUserWithEmailAndPassword(usermail, userpass);

        Alert.alert('MyApp', 'Hesap oluşturuldu!');
        props.navigation.goBack();
      } catch (error) {
        console.log(error)
      }
    } else Alert.alert('MyApp', 'Şifreler Uyuşmuyor');
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
          secureTextEntry
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
          placeholder="Şifrenizi tekrar giriniz.."
          placeholderTextColor="white"
          onChangeText={setPassRep}
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
            onPress={signUser}>
            <Text>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              margin: 5,
              borderRadius: 5,
              alignItems: 'center',
            }}
            onPress={() => props.navigation.goBack()}>
            <Text>Vazgeç</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export {Signup};