import React,{useEffect,useState} from "react"

import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from "react-native";

const Signout = props=>{
    const signOut = () => {
        auth().signOut()
    
        props.navigation.navigate("Login")
        AsyncStorage.removeItem('@USER_ID')
        
    }
    useEffect(()=>
    signOut()
        ,[])
        return(
            <View></View>
        )
}
export {Signout}