import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Alert,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {Input, Button, Card} from 'react-native-elements';

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
        console.log(error);
      }
    } else Alert.alert('MyApp', 'Şifreler Uyuşmuyor');
  };

  return (
    <ImageBackground
      style={styles.Login.Image}
      source={{
        uri:
          'https://i.pinimg.com/564x/78/f9/09/78f9091de9ac0d47467438b78b3fe3b0.jpg',
      }}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <Card
          containerStyle={{
            borderRadius: 5,
            opacity: 0.8,
          }}
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'lucida grande',
          }}
          title="AL GİTSİN">
          <View>
            <Input
              style={styles.Login.input}
              leftIcon={{name: 'mail'}}
              placeholder="E-posta adresinizi giriniz.."
              placeholderTextColor="#424242"
              onChangeText={setMail}
              value={usermail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              leftIcon={{name: 'lock'}}
              style={styles.Login.input}
              placeholder="Şifrenizi giriniz.."
              placeholderTextColor="#424242"
              onChangeText={setPass}
              value={userpass}
              secureTextEntry
            />
            <Input
              leftIcon={{name: 'lock'}}
              style={styles.Login.input}
              placeholder="Şifrenizi giriniz.."
              placeholderTextColor="#424242"
              onChangeText={setPassRep}
              value={userpassRep}
              secureTextEntry
            />

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                onPress={() => {
                  signUser().then(() => {
                    props.navigation.navigate('Login');
                  });
                }}
                title="Kayıt Ol"
                type="solid"
              />
            </View>
          </View>
        </Card>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = {
  Login: StyleSheet.create({
    Image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: Dimensions.get('window').width,
      height: 60,
      borderRadius: 20,
      color: '#ffffff',
      margin: 7,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#eeeeee',
      height: 40,
      borderRadius: 20,
      margin: 4,
    },
  }),
};

export {Signup};
