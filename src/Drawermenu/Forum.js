import React from "react";
import {
  SafeAreaView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  View,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import { Divider } from "react-native-elements";

const Forum = (props) => {
  const [description, setDescription] = React.useState("");
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    readForumEntry();
  }, []);

  const sendForumEntry = () => {
    const userMail = auth().currentUser.email;
    firestore()
      .collection("Forum")
      .add({
        mail: userMail,
        description: description,
        comments: [],
      })
      .then(console.log("Başarılı"));

    setDescription("");
  };

  const readForumEntry = () => {
    firestore()
      .collection("Forum")
      .onSnapshot((querySnapshots) => {
        let dummyArray = [];
        querySnapshots.forEach((snapshot) => {
          dummyArray.push({
            entryId: snapshot.id,
            entryDescription: snapshot.data().description,
            entryComments: snapshot.data().comments,
            entryMail: snapshot.data().mail,
          });
        });
        setEntries(dummyArray);
      });
  };

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#fce4ec" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={styles.Forum.textınput}
            placeholder="Entry Buraya"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity  style ={styles.Forum.button}onPress={sendForumEntry}>
            <Text>SEND</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={(index) => index.toString()}
          data={entries}
          renderItem={({ item }) => (
            <View style={styles.Forum.container}>
              <Text style={styles.Forum.title}>{item.entryMail}</Text>
              <Text style={styles.Forum.text}>{item.entryDescription}</Text>
              <TouchableOpacity
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
                onPress={() => {
                  props.navigation.navigate("Comments", {
                    id: item.entryId,
                    entryDescription: item.entryDescription,
                    mail: item.mail,
                  });
                }}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  source={{
                    uri:
                      "https://www.vippng.com/png/detail/366-3663223_font-comment-comments-comment-icon.png",
                  }}
                ></Image>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = {
  Forum: StyleSheet.create({
    container: {
      margin: 10,
      borderRadius: 10,
      padding: 10,
      backgroundColor: "white",
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      alignSelf: "baseline",

      borderBottomWidth: 0.5,

      borderRadius: 10,
      padding: 5,
      margin: 5,
    },
    text: {
      fontSize: 15,
    },
    textınput: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      width: Dimensions.get("window").width*0.8,
      height: 60,
      borderRadius: 20,
      color: '#ffffff',
      margin:7,

    },
    button:{
      
      backgroundColor: '#eeeeee',
      margin: 7,
      width:Dimensions.get("window").width*0.3,
      
      
      borderRadius: 10,
      height:60,
      justifyContent:"center",
      alignItems:"center"
      
      
    }
  }),
};

export { Forum };
