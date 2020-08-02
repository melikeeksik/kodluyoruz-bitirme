import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import Comments from "../Pages/Comments";
import { Divider } from "react-native-elements";

const Forum = (props) => {
  const mail = auth().currentUser.email;
  const [description, setDescription] = useState("");
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const ref = firestore().collection("Forum");

  const date = moment().calendar();
  async function sendData() {
    await ref.add({
      name: mail,
      description: description,
      date: date,
      comments : []
    });
    setDescription("");
  }

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { name, description, date, comments } = doc.data();
        list.push({
          id: doc.id,
          name: name,
          date: date,
          description: description,
          comments: comments,
        });
      });
      setPost(list);
      console.log("post",post);
    });
  }, []);
  function sendComment(index) {
    let arr =comments.concat({name:mail,description:comment})
    setComments(arr)
    
  firestore()
  .collection("Forum")
  .doc(post[index].id)
  .update({
    comments:arr
  })
  .then(() => {
    console.log("User updated!");
  });
  }
  const renderPost = ({ item, index }) => {
    return (
      <View>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.id}</Text>
        <TextInput onChangeText={(text) => setComment(text)}></TextInput>
        <TouchableOpacity onPress={() => sendComment(index)}>
    <TouchableOpacity onPress={(index)=>{props.navigation.navigate("Comments",{id:item.id})}}>
      <Text>YORUMLAR</Text>
      </TouchableOpacity>
          <Text>YORUM YAP</Text>
        </TouchableOpacity>
        
        <View>
          <Divider style={{ backgroundColor: "blue" }} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.forum.container}>
        <TextInput onChangeText={(text) => setDescription(text)}></TextInput>
        <TouchableOpacity
          style={styles.forum.button}
          onPress={() => sendData()}
        >
          <Text>GÖNDER</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={post}
        renderItem={renderPost}
      />
    </View>
  );
};
const styles = {
  forum: StyleSheet.create({
    container: {
      backgroundColor: "red",
      height: 80,
      margin: 7,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      backgroundColor: "white",
      padding: 10,
    },
  }),
};

export { Forum };
