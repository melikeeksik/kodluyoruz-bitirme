import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { Text, View, FlatList } from "react-native";

const Comments = (props) => {
  const [comments, setComments] = useState([""]);
  const ref = firestore().collection("Forum");
  console.log(props.route.params.id);
  useEffect(() => {
    let list = [];
    firestore()
      .collection("Forum")
      .doc(props.route.params.id)
      .get()
      .then((documentSnapshot) => {
        const { comments } =documentSnapshot.data()
        
       
        list.push(comments);
 
       
        setComments(list);
        console.log("comments", comments);
      });
  }, []);
  const renderComments = ({ item }) => {
    return (<Text>{item.name}</Text>)
  };

  return (
    <View>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={comments}
        renderItem={renderComments}
      />
    </View>
  );
};

export { Comments };
