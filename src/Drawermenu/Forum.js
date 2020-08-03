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
      <View style={{ backgroundColor: "#e6f0ff" }}>
        <TextInput
          style={{
            margin: 10,
            paddingLeft: 10,
            borderRadius: 10,
            shadowOpacity: 0.2,
            shadowRadius: 5,
            borderWidth: 0.5,
          }}
          placeholder="Entry Buraya"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Button title="Send Forum Entry" onPress={sendForumEntry} />
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
  }),
};

export { Forum };
