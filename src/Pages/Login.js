import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

import { Input, Button, Card } from 'react-native-elements';


const Login = (props) => {
  const [usermail, setUserMail] = useState('');
  const [userpass, setPassword] = useState('');

  const setMail = (text) => setUserMail(text);

  const setPass = (text) => setPassword(text);

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
      <SafeAreaView style={{flex: 1,justifyContent:"center"}}>
      <Card
      containerStyle={{
        borderRadius:5,
        opacity:0.8
      }}
      titleStyle={{
        fontSize: 30,
        fontWeight: "bold",
  
      }}
      title="AL GİTSİN">
         <View>
     
     <Input
       style={styles.Login.input}
       leftIcon={{name:"mail"}}
       placeholder="E-posta adresinizi giriniz.."
       placeholderTextColor="#424242"
       onChangeText={setMail}
       value={usermail}
       keyboardType="email-address"
       autoCapitalize="none"
       autoFocus={true}
       
     />

     <Input
     leftIcon={{name:"lock"}}
       style={styles.Login.input}
       placeholder="Şifrenizi giriniz.."
       placeholderTextColor="#424242"
       onChangeText={setPass}
       value={userpass}
       secureTextEntry
     />

     <View style={{marginTop: 20, flexDirection:"row", justifyContent:"space-evenly"}}>
       <Button
       onPress={()=>{
         props.navigation.navigate("Signup")
       }}
       title="Kayıt Ol"
       type="solid"/>
       <Button
       onPress={loginUser}
       title="Giriş Yap"
       type="outline"/>
     </View>
   </View>
      </Card>
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