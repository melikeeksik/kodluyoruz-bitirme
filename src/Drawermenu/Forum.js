import React from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { FAB } from "react-native-paper";

import firestore from "@react-native-firebase/firestore";

const Forum = (props) => {
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    readForumEntry();
  }, []);

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
            enrtyTitle:snapshot.data().title,
            entryDate:snapshot.data().date
          });
        });
        setEntries(dummyArray);
        
      });
  };

  return (
    <SafeAreaView  style={{ backgroundColor: "#fce4ec",flex:1,paddingTop:30}}>
      <View style={{flex:1}}>
        <View>
          <FlatList
            keyExtractor={(index) => index.toString()}
            data={entries}
            renderItem={({ item }) => (
              <View style={styles.Forum.container}>
                <Text style={{fontSize:10}}>{item.entryDate}</Text>
                <Text style={styles.Forum.title}>{item.enrtyTitle}</Text>
                <Text style={styles.Forum.text}>{item.entryDescription}</Text>
                <TouchableOpacity
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  onPress={() => {
                    props.navigation.navigate("Comments", {
                      id: item.entryId,
                      entryDescription: item.entryDescription,
                      mail: item.entryMail,
                      title:item.enrtyTitle
                    });
                  }}
                >
                  <Image
                    style={{ height: 25, width: 25 }}
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
      </View>
      <View>
        <FAB
          small
          icon="plus"
          style={{
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            flex: 1,
            backgroundColor:"#1565c0"
          }}
          onPress={() => {
            props.navigation.navigate("AddQuestion");
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = {
  Forum: StyleSheet.create({
    container: {
      borderRadius: 10,
      margin:5,
     
      backgroundColor: "white",
    },
    title: {
      fontSize: 15,
      fontWeight: "bold",
      alignSelf: "baseline",

      

      borderRadius: 10,
      paddingTop:10,
      paddingBottom:5

    
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
      width: Dimensions.get("window").width * 0.3,

      borderRadius: 10,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
    },
  }),
};

export { Forum };
