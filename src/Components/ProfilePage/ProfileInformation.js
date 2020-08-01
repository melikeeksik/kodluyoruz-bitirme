import React,{useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ProfileInformation = (props) => {
    const [image, setImage] = useState("https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg")
    const [userName, setUserName] = useState("Adınız..")
    const [userLastName, setUserLastName] = useState("Soyadınız..")
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{userName}</Text>
            <Text style={styles.text}>{userLastName}</Text>
            <Text style={styles.text}>ivirzivir@gmail.com</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:2,
        justifyContent:'space-between',
        marginLeft:20,
    },
    text:{
        flex:1,
        fontSize:15
    }
})

export {ProfileInformation}