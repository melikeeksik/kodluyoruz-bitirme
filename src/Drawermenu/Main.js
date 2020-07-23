import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  Image,
  FlatList,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Card, ListItem, Icon} from 'react-native-elements';

import { SearchBar } from "../Components/MainPage";

const Main = (props) => {
  const [products, setProducts] = useState([
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ]);
  const [cpProducts, setcpProducts] = useState([
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ]);

  
  const Post = [
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'melike',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'mert',
      detail: 'ürün ücretsizdir',
      image: 'https://reactnative.dev/img/tiny_logo.png',
    },
  ];
  const searchProduts = (text) => {
    let filteredList = cpProducts.filter(({name}) => {
      const productData = name.toUpperCase();
      const textData = text.toUpperCase();

      return productData.indexOf(textData) > -1;
    });

    setProducts(filteredList);
  };

  const renderPosts = ({item}) => {
    return (
      <Card
        image={{uri: item.image}}
        imageStyle={{resizeMode: 'contain'}}
        containerStyle={styles.Post.container}>
        <Text style={styles.Post.text}>{item.name}</Text>
        <Text>{item.detail}</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Main Page</Text>
        <SearchBar onSearch={searchProduts}/>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={products}
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
