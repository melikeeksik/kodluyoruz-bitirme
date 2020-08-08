import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import {Card} from 'react-native-elements';

import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const ProfileGuest = (props) => {
  const clickedUser = props.route.params.clickedUser;
  const [posts, setPosts] = React.useState([]);
  const [user, setUser] = React.useState({
    name: 'Kullanıcı',
    surname: 'Kullanıcı',
  });

  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    database()
      .ref('/products')
      .on('value', (snapshots) => {
        let cpArray = [];
        snapshots.forEach((snap) => {
          if (snap.val().userEmail === clickedUser) {
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
                setPosts(cpArray);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        });
        database()
          .ref('users/')
          .on('value', (snapshots) => {
            snapshots.forEach((snap) => {
              if (snap.val().email === clickedUser) {
                setUser({
                  name: snap.val().name,
                  surname: snap.val().surname,
                });
              }
            });
          });
      });
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
  return (
    <SafeAreaView>
      <View style={{marginVertical: 20}}>
        <Text>{user.name}</Text>
        <Text>{user.surname}</Text>
      </View>
      <FlatList
        keyExtractor={(index) => index.toString()}
        data={posts}
        renderItem={renderCards}
      />
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  profileHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    margin: 40,
  },

  container: {
    height: 300,
    margin: 7,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
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
    color: '#424242',
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

export {ProfileGuest};
