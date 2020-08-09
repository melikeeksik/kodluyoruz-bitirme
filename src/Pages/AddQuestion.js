import React, { useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity,StyleSheet, Dimensions } from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment"


const AddQuestion = (props) => {
  const [title,setTitle]=React.useState("")
  const [description, setDescription] = React.useState("");
  const date=moment().format();   

  const sendForumEntry = () => {
    const userMail = auth().currentUser.email;
    firestore()
      .collection("Forum")
      .add({
        mail: userMail,
        title:title,
        description: description,
        date:date,
        comments: [],
      })
      .then(console.log("Başarılı"));

    setDescription("");
    setTitle("")
  };

  return (
    <View style={{ paddingTop:60,paddingLeft:10,paddingRight:10 }}>
      <Text style={{padding:10}}>Soru başlığı</Text>
      <TextInput
           
           placeholder="Açılayıcı başlıklar daha dikkat çeker..."
           value={title}
           onChangeText={(text) => setTitle(text)}
           style={styles.Forum.ınput}
         />
         <Text style={{padding:10}}>Detayları ekle</Text>
     <TextInput
           
            placeholder="Sorun için alakalı bir detay gir..."
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.Forum.ınput}
          />
      <View style={{justifyContent:"center",alignItems:"center",padding:20}}>
      <TouchableOpacity style={styles.Forum.buton}onPress={sendForumEntry}>
        <Text>GÖNDER</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
const styles ={
  Forum : StyleSheet.create({
    ınput : {borderBottomWidth:0.5,padding:10,margin:10},
    buton:{
      width:Dimensions.get("window").width/2,
      backgroundColor:"#fce4ec",
      height:40,
      borderRadius:5,
      justifyContent:"center",
      alignItems:"center"
    }
  }
  )
}
export { AddQuestion };
