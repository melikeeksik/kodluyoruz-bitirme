import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import database from "@react-native-firebase/database";

import { Avatar, Divider, Card, Header } from "react-native-elements";
import { ProfileInformation } from "../Components/ProfilePage";
import { ProfilePopularity } from "../Components/ProfilePage";
import { FlatList } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";
const mail = auth().currentUser.email;

const Profile = (props) => {
 
  const [myPost, setMyPost] = useState([]);
  useEffect(() => {
    database()
      .ref("/products")
      .on("value", (snapshot) => {
        
        let arr = [];

        snapshot.forEach((snap) => {
          if (snap.val().userEmail === mail) {
            arr.push(snap.val());
            
            setMyPost(arr)
          }
        });
      });
     
  }, []);

  const renderCards = ({ item }) => {
    return (
      <Card
        containerStyle={stlyes.container}
        title={item.title}
        titleStyle={stlyes.title}
        image={{uri: item.imageRef}}
        imageStyle={{resizeMode: 'contain'}}
      >
         <Text style={stlyes.text}>{item.userEmail}</Text>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View style={{backgroundColor:"#e6f0ff"}}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
        />
        <View style={stlyes.profileHead}>
          <Avatar
            containerStyle={{ width: 100, height: 100, margin: 10, flex: 1 }}
            rounded
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
          />
          <ProfileInformation />
          <ProfilePopularity />
        </View>
        <Divider style={{ height: 10, backgroundColor: "blue" }} />

        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={myPost}
          renderItem={renderCards}
        />
      </View>
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  profileHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

    container: {
      height: 300,
      margin: 7,
      borderRadius:10
    
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      borderBottomWidth:0.5
    },
    title:{
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf:"baseline",
      paddingLeft:20,
      borderBottomWidth:0.5,
      
      
      
      borderRadius:10,
      padding:5,
      margin:5,
      
    },
    Button:{
      backgroundColor:"#3385ff",
      borderRadius:10,
      padding:5,
      
      
    

    },
  view:{
    
    borderRadius:10,
    justifyContent:"space-between",
    padding:5,
    
    
    


  }
});

export { Profile };
