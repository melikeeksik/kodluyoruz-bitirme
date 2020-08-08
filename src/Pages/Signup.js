import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const Signup = (props) => {
  const [usermail, setUserMail] = useState("");
  const [userpass, setPassword] = useState("");


  const [userpassRep, setPasswordRep] = useState("");

  const setMail = (text) => setUserMail(text);

  const setPass = (text) => setPassword(text);

  const setPassRep = (text) => setPasswordRep(text);

  const signUser = async () => {
    if (userpass === userpassRep) {
      try {
        await auth().createUserWithEmailAndPassword(usermail, userpass);
        

        Alert.alert("MyApp", "Hesap oluşturuldu!");
        props.navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    } else Alert.alert("MyApp", "Şifreler Uyuşmuyor");
  
  };

  return (
    <ImageBackground
      style={styles.Sıgnup.Image}
      source={{
        uri:
          "https://i.pinimg.com/564x/78/f9/09/78f9091de9ac0d47467438b78b3fe3b0.jpg",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
        
          <TextInput
            style={styles.Sıgnup.input}
            placeholder="E-posta adresinizi giriniz.."
            placeholderTextColor="#424242"
            onChangeText={setMail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.Sıgnup.input}
            placeholder="Şifrenizi giriniz.."
            placeholderTextColor="#424242"
            onChangeText={setPass}
            secureTextEntry
          />

          <TextInput
            style={styles.Sıgnup.input}
            placeholder="Şifrenizi tekrar giriniz.."
            placeholderTextColor="#424242"
            onChangeText={setPassRep}
            secureTextEntry
          />

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.Sıgnup.button} onPress={signUser}>
              <Text style={{ color: "#424242" }}>Kayıt Ol</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Sıgnup.button}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={{ color: "#424242" }}>Vazgeç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = {
  Sıgnup: StyleSheet.create({
    Image: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      width: Dimensions.get("window").width,
      height: 60,
      borderRadius: 20,
      color: "#424242",
      margin: 7,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#eeeeee",
      height: 40,
      borderRadius: 20,
      margin: 4,
    },
  }),
};

export { Signup };
