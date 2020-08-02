import React from 'react';
import {
  SafeAreaView,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {Divider} from 'react-native-elements';

const Forum = (props) => {
  const [description, setDescription] = React.useState("");
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    readForumEntry();
  }, []);

  const sendForumEntry = () => {
    const userMail = auth().currentUser.email;
    firestore()
      .collection('Forum')
      .add({
        mail:userMail,
        description:description,
        comments: [],
      })
      .then(console.log('Başarılı'));

    setDescription("")
  };

  const readForumEntry = () => {
    firestore()
      .collection('Forum')
      .onSnapshot((querySnapshots) => {
        let dummyArray = [];
        querySnapshots.forEach((snapshot) => {
          dummyArray.push({
            entryId: snapshot.id,
            entryDescription: snapshot.data().description,
            entryComments: snapshot.data().comments,
            entryMail: snapshot.data().mail,
          });
        });
        setEntries(dummyArray);
      });
  };

  return (
    <SafeAreaView>
      <Text>Forum</Text>
      <Button title="Send Forum Entry" onPress={sendForumEntry} />
      <TextInput 
      style={{height:50,width:Dimensions.get("window").width,backgroundColor:'green'}}
      placeholder="Entry Buraya"
      value={description}
      onChangeText={(text)=>setDescription(text)}/>
      <FlatList
        keyExtractor={(index) => index.toString()}
        data={entries}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>{
            props.navigation.navigate('Comments', {
              id: item.entryId, 
              entryDescription:item.entryDescription,
              mail:item.mail});
          }}>
            <Text>{item.entryDescription}</Text>
            <Text>{item.entryMail}</Text>
            <Text>{item.entryId}</Text>
            <Divider style={{height: 20, backgroundColor: 'red'}} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export {Forum};
