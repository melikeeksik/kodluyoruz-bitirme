import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Card, Icon} from 'react-native-elements';
import database from '@react-native-firebase/database';

const Blog = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = () => {
    setIsLoading(true)
    database()
      .ref('blog')
      .on('value', (snapshots) => {
        let dummyArray = [];
        snapshots.forEach((snap) => {
          dummyArray.push({
            title: snap.val().title,
            content: snap.val().content,
            imageUrl:snap.val().imageUrl
          });
        });
        setPosts(dummyArray);
      });
      setIsLoading(false)
  };

  const renderPosts = ({item}) => {
    return (
      <Card
        title={item.title}
        titleStyle={styles.title}
        containerStyle={styles.container}>
        <View style={{justifyContent:"space-between",margin:5}}>
        <Text numberOfLines={2} style={styles.text}>{item.content}</Text>
        <View style={{flexDirection:"row",justifyContent:"flex-end", alignContent:"center"}}>
        <Text style={{margin:10}}>Yazının devamı için..</Text>
        <Icon
        name="label"
        iconStyle={styles.icon}
        containerStyle={styles.container}
        onPress={()=>{
          props.navigation.navigate("BlogDetail", {content:item})
        }}
        />
        </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{flex: 1,backgroundColor: "#fce4ff"}}>
      <View style={{flex: 1, margin:10}}>
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={posts}
          renderItem={renderPosts}
          refreshing={isLoading}
          onRefresh={fetchBlog}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 200,
    margin: 7,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    borderRadius: 10,
    padding: 5,
    margin: 5,
    color: '#424242',
  },

  view: {
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 5,
  },
  icon:{
    color:"black"
  },
  iconContainer:{
    margin:5,
  }
});

export {Blog};
