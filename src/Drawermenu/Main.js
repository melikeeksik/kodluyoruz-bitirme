import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import {Card,} from 'react-native-elements';
import { SearchBar } from "../Components/MainPage";

import database from "@react-native-firebase/database"
import storage from "@react-native-firebase/storage"


const Main = (props) => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [cpProducts, setcpProducts] = useState([]);

  useEffect(()=>{
    fecthProducts()
  },[])


  const fecthProducts = ()=>{
    setIsLoading(true)
    database().ref("/products")
    .on('value',snapshots => {
      let cpArray = []
      snapshots.forEach(snap=>{
        const ref = storage().ref(`${snap.val().imageRef}`)
        ref.getDownloadURL()
        .then((url)=>{
          cpArray.push({
            imageRef: url,
            userEmail: snap.val().userEmail,
            description: snap.val().description,
            title:snap.val().title
          })
          setProducts(cpArray)
          setcpProducts(cpArray)
        }).catch(e=>{console.log(e);})
      })
    })
    setIsLoading(false)
  }


  const searchProduts = (text) => {
    let filteredList = cpProducts.filter(({description}) => {
      const productData = description.toUpperCase();
      const textData = text.toUpperCase();
      return productData.indexOf(textData) > -1;
    });

    setProducts(filteredList);
  };

  const renderPosts = ({item}) => {
    return (
      <Card
        title={item.title}
        image={{uri: item.imageRef}}
        imageStyle={{resizeMode: 'contain'}}
        containerStyle={styles.Post.container}>
        <Text style={styles.Post.text}>{item.userEmail}</Text>
        <Text>{item.description}</Text>
      </Card>
    );
  };

  return (
    isLoading ? <ActivityIndicator/> : <SafeAreaView>
    <View>
      <Text>Main Page</Text>
      <SearchBar onSearch={searchProduts}/>
      <Button
    title="Fetch"
    onPress={fecthProducts}
    />
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={products.reverse()}
        renderItem={renderPosts}
      />
    </View>
  </SafeAreaView>
  );
};
const styles = {
  Post: StyleSheet.create({
    container: {
      height: 300,
      margin: 10,
      borderRadius: 40,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }),
};
export {Main};
