import React from 'react';
import {
  SafeAreaView,
  Text,
  FlatList,
  TextInput,
  Dimensions,
  View,
  StyleSheet,
} from 'react-native';
import {Card, Divider, Icon, Input} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const Comments = (props) => {
  const [userComments, setUserComments] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const currentUser = auth().currentUser.email

  React.useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    firestore()
      .collection('Forum')
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
    firestore().collection('Forum').doc(props.route.params.id).update({
      comments: dummyArray,
    });
    setComment('');
  };
  const renderComments = ({item, index}) => {
    let styleMargin = styles.Comments.containerWithMargin
    if(index % 2 === 0 ){
      styleMargin = styles.Comments.container
    }
    return (
      <Card
        title={item.description}
        titleStyle={styles.Comments.title}
        containerStyle={styleMargin}>
        <Text style={styles.Comments.text}>{currentUser}</Text>
      </Card>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fce4ff'}}>
      <View style={{flex:1}}>
        <View
          style={{
            borderRadius: 10,
            padding: 20,
            margin:20,
            backgroundColor: 'white',
            alignItems:"flex-start"
          }}>
          <Text style={{fontSize:30, fontWeight:"bold"}}>{props.route.params.title}</Text>
          <Text style={{fontSize:20,marginVertical:20}}>{props.route.params.entryDescription}</Text>
        </View>
        <Text style={{alignSelf:"center", fontSize:20}}>YORUMLAR</Text>
        <Divider style={{
          height:3,
          marginHorizontal:50,
        }}/>

        <FlatList
          keyExtractor={(index) => index.toString()}
          data={userComments}
          renderItem={renderComments}
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',padding:10}}>
        <Input
          numberOfLines={3}
          multiline={true}
          containerStyle={styles.Comments.textınput}
          placeholder="Buradan Yorum Yapabilirsiniz.."
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <Icon
        name="send"
        onPress={sendComment}
        iconStyle={{color:"gray"}}
        containerStyle={{alignSelf:"center",}}
/>
      </View>
    </SafeAreaView>
  );
};
const styles = {
  Comments: StyleSheet.create({
    container: {
      borderRadius: 10,
      width:Dimensions.get("screen").width* 0.6,
      alignSelf:"flex-end",
      marginVertical:20,
    },
    containerWithMargin: {
      borderRadius: 10,
      width:Dimensions.get("screen").width* 0.6,
      alignSelf:"flex-end",
      marginRight:100,
      marginVertical:20,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      alignSelf: "baseline",
      borderBottomWidth: 0.5,
      borderRadius: 10,
      padding: 5,
      margin: 5,
    },
    text: {
      fontSize: 15,
      alignSelf:"flex-end"
    },
    textınput: {
      width: Dimensions.get('window').width * 0.8,
      height: 60,
      borderRadius: 20,
      color: '#ffffff',
      margin: 7,
    },
    button: {
      backgroundColor: '#eeeeee',
      margin: 7,

      borderRadius: 10,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign:"left",
      borderRadius: 10,
      padding: 5,
      margin: 5,
      color: '#424242',
    },
    post: {
      alignSelf: 'center',
      fontSize: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      margin: 10,
      borderRadius: 10,
      padding: 10,
    },
  }),
};

export {Comments};
