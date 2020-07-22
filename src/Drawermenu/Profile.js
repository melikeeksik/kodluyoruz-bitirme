import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import React from 'react';

import {Avatar, Divider, Card, Header} from 'react-native-elements';
import {ProfileInformation} from '../Components/ProfilePage';
import {ProfilePopularity} from '../Components/ProfilePage';
import {FlatList} from 'react-native-gesture-handler';

const Profile = (props) => {
  const dummyDatas = [
    {
      name: 'alksjdlaksdkla',
      sit: 'Hediye Edildi',
      img: 'https://reactnative.dev/img/tiny_logo.png',
    },
    {
      name: 'alksjdlaksdkla',
      sit: 'Hediye Alındı',
      img: 'https://reactnative.dev/img/tiny_logo.png',
      exp: 'alsşdkaşls12d12d12şldsakşld',
    },
    {
      name: 'vasdasdq1ksdkla',
      sit: 'Hediye Edildi',
      img: 'https://reactnative.dev/img/tiny_logo.png',
      exp: 'alsşdkaşls12d12d12şldsakşld',
    },
    {
      name: 'ad12d12d12dd',
      sit: 'Hediye Edildi',
      img: 'https://reactnative.dev/img/tiny_logo.png',
      exp: 'alsşdkaşls12d12d12şldsakşld',
    },
  ];

  const renderCards = ({item}) => {
    return (
      <Card
        containerStyle={{margin: 5}}
        title={item.name + `  (${item.sit})`}
        imageStyle={{resizeMode: 'contain'}}
        image={{uri: item.img}}>
        <Text style={{marginBottom: 10}}>{item.exp}</Text>
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="AYRINTI"
        />
      </Card>
    );
  };

  return (
    <SafeAreaView>
      <View>
        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={stlyes.profileHead}>
          <Avatar
            containerStyle={{width: 100, height: 100, margin: 10, flex: 1}}
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
          />
          <ProfileInformation />
          <ProfilePopularity />
        </View>
        <Divider style={{height: 10, backgroundColor: 'blue'}} />

        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={dummyDatas}
          renderItem={renderCards}
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
  },
});

export {Profile};
