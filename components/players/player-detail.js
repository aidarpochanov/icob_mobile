import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchingIndicator from 'react-native-fetching-indicator';
import MatchItem from '../matches/match-item'


export default function PlayerDetail(props) {

    useEffect(() => {
        console.log(props.route.params.player);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.centeredText}>Matches played:</Text>
            <FlatList  
                data={props.route.params.player.matches}
                renderItem={({item}) => 
                    {
                        if(Date.parse(item.date) <= Date.now()){
                            return (
                                <MatchItem match={item} isFutureMatch={false} navigation={props.navigation}/>
                            )
                        }
                    }
                }
                keyExtractor = {(item, index) => item.id.toString()}
            />
            <Text style={styles.centeredText}>Future matches signed up for:</Text>
            <FlatList  
                data={props.route.params.player.matches}
                renderItem={({item}) => 
                    {
                        if(Date.parse(item.date) > Date.now()){
                            return (
                                <MatchItem match={item} isFutureMatch={true} navigation={props.navigation}/>
                            )
                        }
                    }
                }
                keyExtractor = {(item, index) => item.id.toString()}
            />
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
