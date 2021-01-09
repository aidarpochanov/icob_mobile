import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, AsyncStorage, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchingIndicator from 'react-native-fetching-indicator';


export default function PlayerDetail(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.itemText}>{props.route.params.player.name + " " + props.route.params.player.surname}</Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#282C35',
        padding: 10
    },
    item: {
        flex: 1,
        padding: 10,
        height: 50,
        backgroundColor: '#282C35'
    },
    itemText: {
        color: '#fff',
        fontSize: 24
    },
    lineStyle: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    centeredText:{
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
    }
  });
