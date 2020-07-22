import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const ProfileInformation = (props) => {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Ivır</Text>
            <Text style={styles.text}>Zıvır</Text>
            <Text style={styles.text}>ivirzivir@gmail.com</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:2,
        justifyContent:'space-between'
    },
    text:{
        fontSize:20
    }
})

export {ProfileInformation}