import React,{useEffect, useState} from 'react'
import { SafeAreaView, Text, View } from "react-native";

import { ImagesContainer } from "../Components/AddProducts";

const AddProducts = (props)=>{
  
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center'}}>
            <View>
            <ImagesContainer/>
            </View>
        </SafeAreaView>
    )
}

export {AddProducts}