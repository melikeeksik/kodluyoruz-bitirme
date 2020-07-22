import React from 'react'
import { SafeAreaView, Text, Button, Image, FlatList, View, Dimensions,StyleSheet } from "react-native";
import { Card, ListItem, Icon } from 'react-native-elements'

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

const Main = props => {
    const Post = [
        {
            name: "melike",
            detail: "ürün ücretsizdir",
            image: "https://productimages.hepsiburada.net/s/35/550/10489154142258.jpg/format:webp"

        },
        {
            name: "mert",
            detail: "ürün ücretsizdir",
            image: "https://productimages.hepsiburada.net/s/35/550/10489154142258.jpg/format:webp"

        },
        {
            name: "mhjkl",
            detail: "ürün ücretsizdir",
            image: "https://productimages.hepsiburada.net/s/35/550/10489154142258.jpg/format:webp"

        },
        {
            name: "melike",
            detail: "ürün ücretsizdir",
            image: "https://productimages.hepsiburada.net/s/35/550/10489154142258.jpg/format:webp"

        }
    ]
    const renderPosts = ({ item }) => {
        return (<Card image={{ uri: item.image }} imageStyle={{ resizeMode: "center" }} containerStyle={styles.Post.container}>
            <Text style={styles.Post.text}>{item.name}</Text>
            <Text>{item.detail}</Text>
        </Card>)
    }
    
    return (
        <SafeAreaView>
            <View>
                <Text>Main Page</Text>
               
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={Post}
                    renderItem={renderPosts} />



            </View>
        </SafeAreaView>
    )
}
const styles = {
    Post: StyleSheet.create(
        { container:{
            width: Dimensions.get("window").width,
        height: 300,
        margin: 0,
        borderRadius: 40
            
        },
        text:{
            fontSize:20,
            fontWeight:"bold",
            
        }
        }
    )
}
export { Main }