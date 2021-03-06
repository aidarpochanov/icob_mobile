import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchingIndicator from 'react-native-fetching-indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MatchDetail(props) {

    const match = props.route.params.match
    const isFutureMatch = props.route.params.isFutureMatch
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    let token = null

    const getPlayers = async (item) => {
        token = await AsyncStorage.getItem('icob-token');
        setLoading(true)
        fetch(`https://icob-app.herokuapp.com/mainapp/matches/${item.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.json()) 
        .then(jsonRes => {
            setPlayers(jsonRes.players)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    const voteMOTM = async (player) => {
        token = await AsyncStorage.getItem('icob-token');
        fetch(`https://icob-app.herokuapp.com/mainapp/matches/${match.id}/vote/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'player_voted_for': player.id
            })
        })
        .then(res => res.json()) 
        .then(jsonRes => {
            Alert.alert(jsonRes.message)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const playerClicked = player => {
        props.navigation.navigate("Player List", { screen: 'Player Detail', params: {player: player}})
    }

    useEffect(() => {
        getPlayers(match)
    }, [])

    return (
        <View style={styles.container}>
            <FlatList  
                data={players}
                renderItem={({item}) => (
                    <View style={{flexDirection: "row", justifyContent:"space-between", marginBottom: 20}}>
                        <TouchableOpacity onPress={() => playerClicked(item)}>
                            <View>
                                <Text style={styles.itemText}>{item.name + " " + item.surname}</Text>
                                <View style={styles.lineStyle} />
                            </View>
                        </TouchableOpacity>
                        <View>
                            {!isFutureMatch &&
                                <Button title="Vote MOTM" onPress={() => voteMOTM(item)}/>
                            }
                        </View>
                    </View>
                )}
                keyExtractor = {(item, index) => item.id.toString()}
            />
            <FetchingIndicator isFetching={loading} message="Fetching players" backdropColor='rgba(0, 0, 0, 0.50)' color='blue'/>
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
        backgroundColor: '#282C35',
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
    },
    viewWithButton:{
        display: 'flex'
    }
  });
