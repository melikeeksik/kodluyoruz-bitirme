import {SafeAreaView, Text, View, FlatList,StyleSheet,Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Card} from 'react-native-elements';
import database from '@react-native-firebase/database';

const Blog = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    database()
      .ref('blog')
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        let arr = Object.values(snapshot.val());
        setPosts(arr);
        console.log(posts);
        console.log(arr);
      });
  }, []);
  const renderPosts = ({item}) => {
    return (
      <Card containerStyle={styles.Forum.container}>
        <Text>{item}</Text>
      </Card>
    );
  };

  return (
    <View  style={{ backgroundColor: "#fce4ec" ,flex:1}}>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={posts}
        renderItem={renderPosts}
      />
    </View>
  );
};
const styles = {
  Forum: StyleSheet.create({
    container: {
      height: 300,
      margin: 7,
      borderRadius: 10,
      
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
      
     
      
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: 'baseline',
      
      borderBottomWidth: 0.5,

      borderRadius: 10,
      padding: 5,
      margin: 5,
      color:"#424242"
    },

    view: {
      borderRadius: 10,
      justifyContent: 'space-between',
      padding: 5,
    },
  }),
};

export {Blog};
