  
import { SafeAreaView, Text, View ,FlatList} from "react-native";
import React, { useEffect, useState } from "react"

import { Card } from 'react-native-elements'
import database from '@react-native-firebase/database';



const Blog = (props) => {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
      
        database()
  .ref('blog')
  .on('value', snapshot => {
    console.log('User data: ', snapshot.val());
    let arr= Object.values(snapshot.val())
    setPosts(arr)
    console.log(posts)
    console.log(arr)
  });

    },[])
    const renderPosts = ({item}) =>{
        return(
            <Card
            containerStyle={{ height: 300,
                margin: 10,
                borderRadius: 40}}>
                <Text>{item}</Text>
            </Card>
        )
    }

    return(
        
            <View>
                <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={posts}
          renderItem={renderPosts}
        />
            </View>
        
    )
}

export {Blog}