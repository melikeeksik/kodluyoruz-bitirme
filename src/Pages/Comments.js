import React from "react"
import { SafeAreaView, Text, FlatList, Button, TextInput,Dimensions } from "react-native";

import firestore from "@react-native-firebase/firestore";


const Comments = (props)=>{
  const [userComments, setUserComments] = React.useState([])
  const [comment, setComment] =  React.useState("")

  React.useEffect(()=>{
    fetchComments()
  },[])

  const fetchComments = ()=>{
    firestore().collection("Forum").doc(props.route.params.id)
    .onSnapshot((querySnapshots)=>{
      setUserComments(querySnapshots.data().comments)
    })
  }

  const sendComment = ()=>{
    let dummyArray=userComments.concat({description:comment,mail:props.route.params.mail})
    firestore().collection("Forum").doc(props.route.params.id).update({
      comments: dummyArray
    })
    setComment("")
  }
  return(
    <SafeAreaView>
      <Text style={{alignSelf:"center", fontSize:20,fontWeight:"bold"}}>{props.route.params.entryDescription}</Text>
      <TextInput 
      style={{height:50,width:Dimensions.get("window").width,backgroundColor:'green'}}
      placeholder="Entry Buraya"
      value={comment}
      onChangeText={(text)=>setComment(text)}/>
      <Button
      title="Yorum Ekle"
      onPress={sendComment}/>
      <FlatList
      keyExtractor={(index)=>index.toString()}
      data={userComments}
      renderItem={({item})=><Text>{item.description}</Text>}
      />
    </SafeAreaView>
  )
}

export { Comments }