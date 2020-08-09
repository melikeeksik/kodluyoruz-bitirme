import React from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  Button,
  TextInput,
  Dimensions,
  View,
  StyleSheet,
} from "react-native";
import { Card } from "react-native-elements";

import firestore from "@react-native-firebase/firestore";
import { TouchableOpacity } from "react-native-gesture-handler";

const Comments = (props) => {
  const [userComments, setUserComments] = React.useState([]);
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    firestore()
      .collection("Forum")
      .doc(props.route.params.id)
      .onSnapshot((querySnapshots) => {
        setUserComments(querySnapshots.data().comments);
      });
  };

  const sendComment = () => {
    let dummyArray = userComments.concat({
      description: comment,
      mail: props.route.params.mail,
    });
    firestore().collection("Forum").doc(props.route.params.id).update({
      comments: dummyArray,
    });
    setComment("");
  };
  const renderComments = ({ item, index }) => {
    return (
      <Card
        title="deneme@gmail.com"
        titleStyle={styles.Comments.title}
        containerStyle={styles.Comments.container}
      >
        <Text style={styles.Comments.text}>{item.description}</Text>
      </Card>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#fce4ec", flex: 1, paddingTop: 30 }}>
        <View>
          <View
            style={{
              borderRadius: 10,
              margin: 5,

              backgroundColor: "white",
            }}
          >
            <Text>{props.route.params.title}</Text>
            <Text>{props.route.params.entryDescription}</Text>
          </View>
          <Text>YORUMLAR</Text>

          <FlatList
            keyExtractor={(index) => index.toString()}
            data={userComments}
            renderItem={renderComments}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          style={styles.Comments.textınput}
          placeholder="Entry Buraya"
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.Comments.button} onPress={sendComment}>
          <Text>YORUM YAP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = {
  Comments: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin: 5,

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
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      width: Dimensions.get("window").width * 0.8,
      height: 60,
      borderRadius: 20,
      color: "#ffffff",
      margin: 7,
    },
    button: {
      backgroundColor: "#eeeeee",
      margin: 7,

      borderRadius: 10,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      alignSelf: "baseline",

      borderBottomWidth: 0.5,

      borderRadius: 10,
      padding: 5,
      margin: 5,
      color: "#424242",
    },
    post: {
      alignSelf: "center",
      fontSize: 20,
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      margin: 10,
      borderRadius: 10,
      padding: 10,
    },
  }),
};

export { Comments };
