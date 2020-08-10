import React from 'react';
import {SafeAreaView, View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';

import {Image, Text, Divider} from 'react-native-elements';
const BlogDetail = (props) => {
  const blog = props.route.params.content;
  const blogContent = blog.content.replaceAll("\\n",  "\n")
  return (
    <SafeAreaView style={{flex:1, alignItems:"center", backgroundColor: "#fce4ec",}}>
      <View style={{marginTop:20, justifyContent:"space-evenly",marginHorizontal:20}}>
        <Text h3>{blog.title}</Text>
        <Divider style={{margin:10,height:5}}/>
        <Image
          source={{uri: blog.imageUrl}}
          style={{width: 275, height: 275, marginTop:50, resizeMode:"cover" ,marginLeft:Dimensions.get("window").width*0.1}}
          PlaceholderContent={<ActivityIndicator />}
        />
        
        <ScrollView style={{margin:40}}>
            <Text style={{
                fontSize:20,
                letterSpacing:2
            }}>
                {blogContent}
            </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export {BlogDetail};
