import React from 'react'
import { SafeAreaView, Text, View } from "react-native";

import { ImagesContainer } from "../Components/AddProducts";

const AddProducts = (props)=>{
  
    return(
        <SafeAreaView style={{flex:1, alignItems:'center',backgroundColor: "#fce4ff"}}>
            
            <ImagesContainer/>
        </SafeAreaView>
    )
}

export {AddProducts}