import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';

import ImagePicker from 'react-native-image-picker';

import {Avatar, Divider, Card} from 'react-native-elements';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const Profile = (props) => {
  const mail = auth().currentUser.email;
  const [myPost, setMyPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userid = auth().currentUser.uid;
  const [user, setUser] = useState({name: 'Kullanıcı', surname: 'Kullanıcı'});

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
    database()
      .ref(`users/${userid}`)
      .on('value', (snapshot) => {
        setUser({
          name: snapshot.val().name,
          surname: snapshot.val().surname,
        });
        console.log(user);
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
    <SafeAreaView>
      <View style={{backgroundColor: '#fce4ec',}}>
        <View style={{marginTop:50,marginHorizontal:10, marginBottom:30}}>
          
            <View style={{flexDirection: 'row',}}>
              <Text>İsim:          </Text>
              <Text>{user.name}</Text>
            </View>
            <View style={{ flexDirection: 'row'}}>
              <Text>Soyisim:    </Text>
              <Text>{user.surname}</Text>
            </View>

          <TouchableOpacity
              style={{alignSelf: 'flex-end', flex: 1}}
              onPress={() => props.navigation.navigate('ProfilInformation')}>
              <Text>Güncelle</Text>
            </TouchableOpacity>
        </View>
        <Divider
          style={{
            backgroundColor: 'gray',
            height: 5,
            marginHorizontal: 10,
            borderRadius: 5,
          }}
        />

      </View>
      <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={myPost}
          renderItem={renderCards}
          refreshing={isLoading}
          onRefresh={fetchData}
        />
    </SafeAreaView>
  );
};

const stlyes = StyleSheet.create({
  container: {
    flex:1,
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

export {Profile};
