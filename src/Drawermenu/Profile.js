import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

import {Avatar, Divider, Card} from 'react-native-elements';
import {ProfileInformation} from '../Components/ProfilePage';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const Profile = (props) => {
  const mail = auth().currentUser.email;
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    database()
      .ref('/products')
      .on('value', (snapshots) => {
        let cpArray = [];
        snapshots.forEach((snap) => {
          if (mail === snap.val().userEmail) {
            const ref = storage().ref(`${snap.val().imageRef}`);
            ref
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                cpArray.push({
                  imageRef: url,
                  userEmail: snap.val().userEmail,
                  description: snap.val().description,
                  title: snap.val().title,
                });
                setMyPost(cpArray);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
      });
    setIsLoading(false);
  };
  const renderCards = ({item}) => {
    return (
      <Card
        containerStyle={stlyes.container}
        title={item.title}
        titleStyle={stlyes.title}
        image={{uri: item.imageRef}}
        imageStyle={{resizeMode: 'contain'}}>
        <Text style={stlyes.text}>{item.userEmail}</Text>
        <Text style={{marginBottom: 10}}>{item.description}</Text>
      </Card>
    );
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={{flex: 1, marginBottom: 10}}>
      <View style={{backgroundColor: '#e6f0ff'}}>
        <View style={stlyes.profileHead}>
          <Avatar
            size={100}
            rounded
            icon={{name: 'user', type: 'font-awesome'}}
            activeOpacity={0.7}
            containerStyle={{flex: 1, marginLeft: 20}}
            showAccessory={true}
            accessory={{size: 20}}
            onAccessoryPress={()=>{
              console.log("itss worked!!")
            }}
          />
          <ProfileInformation />
        </View>
        <Divider style={{height: 10, backgroundColor: 'blue'}} />

        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={myPost}
          renderItem={renderCards}
          refreshing={isLoading}
          onRefresh={fetchData}
        />
      </View>
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  profileHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  container: {
    height: 300,
    margin: 7,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    paddingLeft: 20,
    borderBottomWidth: 0.5,

    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  Button: {
    backgroundColor: '#3385ff',
    borderRadius: 10,
    padding: 5,
  },
  view: {
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 5,
  },
});

export {Profile};
