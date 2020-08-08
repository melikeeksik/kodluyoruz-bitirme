import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import database from "@react-native-firebase/database";

import ImagePicker from "react-native-image-picker";

import { Avatar, Divider, Card } from "react-native-elements";

import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const Profile = (props) => {
  const mail = auth().currentUser.email;
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userid = auth().currentUser.uid;
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    database()
      .ref("/products")
      .on("value", (snapshots) => {
        let cpArray = [];
        snapshots.forEach((snap) => {
          if (mail === snap.val().userEmail) {
            const ref = storage().ref(`${snap.val().imageRef}`);
            ref
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                cpArray.push({
                  imageRef: url,
                  userEmail: snap.val().userEmail,
                  description: snap.val().description,
                  title: snap.val().title,
                });
                setMyPost(cpArray);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });
    database()
      .ref(`users/${userid}`)
      .on("value", (snapshot) => {
        let arr = [];
        arr.push({
          name: snapshot.val().name,
          surname: snapshot.val().surname,
        });

        console.log("arr", arr);
        setUser(arr);
        console.log(user);
      });

    setIsLoading(false);
  };
  const renderCards = ({ item }) => {
    return (
      <Card
        containerStyle={stlyes.container}
        title={item.title}
        titleStyle={stlyes.title}
        image={{ uri: item.imageRef }}
        imageStyle={{ resizeMode: "contain" }}
      >
        <Text style={stlyes.text}>{item.userEmail}</Text>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      </Card>
    );
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={{ flex: 1, marginBottom: 10 }}>
      <View style={{ backgroundColor: "#fce4ec", flex: 1 }}>
        <View style={{ padding: 40 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("ProfilInformation")}
          >
            <Text>güncelle</Text>
          </TouchableOpacity>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={user}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text>{item.name}</Text>
                  <Text>{item.surname}</Text>
                </View>
              );
            }}
            refreshing={isLoading}
            onRefresh={fetchData}
          ></FlatList>
        </View>
        <Divider style={{ height: 10, backgroundColor: "blue" }} />

        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={myPost}
          renderItem={renderCards}
          refreshing={isLoading}
          onRefresh={fetchData}
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
    marginBottom: 10,
    margin: 40,
  },

  container: {
    height: 300,
    margin: 7,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "baseline",
    paddingLeft: 20,
    borderBottomWidth: 0.5,

    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: "#424242",
  },
  Button: {
    backgroundColor: "#3385ff",
    borderRadius: 10,
    padding: 5,
  },
  view: {
    borderRadius: 10,
    justifyContent: "space-between",
    padding: 5,
  },
});

export { Profile };
