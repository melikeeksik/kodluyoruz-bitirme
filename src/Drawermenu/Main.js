import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-community/async-storage";

import { SearchBar } from "../Components/MainPage";
import { ImgModal } from "../Components/General";

import { Card, Icon, Header } from "react-native-elements";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import { openComposer } from "react-native-email-link";

const Main = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cpProducts, setcpProducts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

  useEffect(() => {
    fecthProducts();
  }, []);

  const fecthProducts = () => {
    setIsLoading(true);
    database()
      .ref("/products")
      .on("value", (snapshots) => {
        let cpArray = [];
        snapshots.forEach((snap) => {
          const ref = storage().ref(`${snap.val().imageRef}`);
          ref
            .getDownloadURL()
            .then((url) => {
              cpArray.push({
                imageRef: url,
                userEmail: snap.val().userEmail,
                description: snap.val().description,
                title: snap.val().title,
              });
              setProducts(cpArray);
              setcpProducts(cpArray);
            })
            .catch((e) => {
              console.log(e);
            });
        });
      });
    setIsLoading(false);
  };

  function sendMail(index) {
    console.log(products[index].userEmail);
    openComposer({
      to: products[index].userEmail,
      subject: "Pets uygulamasındaki ürününüz için",
      body: "",
    });
  }
  const signOut = () => {
    auth().signOut();

    props.navigation.navigate("Login");
    AsyncStorage.removeItem("@USER_ID");
  };

  const searchProduts = (text) => {
    let filteredList = cpProducts.filter(({ description }) => {
      const productData = description.toUpperCase();
      const textData = text.toUpperCase();
      return productData.indexOf(textData) > -1;
    });

    setProducts(filteredList);
  };
  const customIcon = (props) => {
    return <Icon name="star" onPress={signOut}></Icon>;
  };

  const renderPosts = ({ item, index }) => {
    return (
      <Card
        title={item.title}
        titleStyle={styles.Post.title}
        image={{ uri: item.imageRef }}
        imageStyle={{ resizeMode: "contain" }}
        containerStyle={styles.Post.container}
      >
        <View style={styles.Post.view}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
            onPress={()=>{
              if(products[index].userEmail===auth().currentUser.email){
                props.navigation.navigate("Profile")
              }else if(products[index].userEmail != auth().currentUser.email){
                props.navigation.navigate("ProfileGuest", {clickedUser:products[index].userEmail})
              }
            }}
            >
            <Text style={styles.Post.text}>{item.userEmail}</Text>
            </TouchableOpacity>
            <Icon
              name="search"
              color="#0e0e0e"
              onPress={() => {
                setModalUrl(products[index].imageRef);
                setModalShow(true);
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{item.description}</Text>
            <Icon
              name="mail"
              color="#0e0e0e"
              onPress={() => {
                sendMail(index);
              }}
            />
          </View>
        </View>
      </Card>
    );
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#fce4ec" }}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
          rightComponent={customIcon}
        />
        <View>
          <ImgModal
            imgUrl={modalUrl}
            visible={modalShow}
            onPress={() => {
              console.log(">@@@@@<");
              setModalShow(false);
            }}
          />
          <SearchBar onSearch={searchProduts} />

          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={products.reverse()}
            renderItem={renderPosts}
            refreshing={isLoading}
            onRefresh={fecthProducts}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  Post: StyleSheet.create({
    container: {
      height: 300,
      margin: 7,
      borderRadius: 10,
    },
    text: {
      fontSize: 15,
      fontWeight: "bold",
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

    view: {
      borderRadius: 10,
      justifyContent: "space-between",
      padding: 5,
    },
  }),
};
export { Main };
