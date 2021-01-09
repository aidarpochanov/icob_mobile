import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FetchingIndicator from 'react-native-fetching-indicator'
import PlayerItem from './player-item'

export default function PlayerList(props) {

    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    let token = null

    const getPlayers = async () => {
        token = await AsyncStorage.getItem('icob-token');
        // console.log("in get matches"+token)
        setLoading(true)
        fetch('https://icob-app.herokuapp.com/mainapp/players/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => {
            return res.json()
        }) 
        .then(jsonRes => {
            setPlayers(jsonRes)
            // console.log(players)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getPlayers();
    }, [])

    return (
        <View style={styles.container}>
        <Text style={styles.centeredText}>ICOB 2s players:</Text>
        <FlatList  
            data={players}
            renderItem={({item}) => 
                {
                    return(<PlayerItem player={item} navigation={props.navigation} />)
                }
            }
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
      backgroundColor: '#282C35'
    },
    itemText: {
      color: '#fff',
      fontSize: 24
    },
    lineStyle:{
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
    },
    centeredText:{
      color: '#fff',
      fontSize: 24,
      textAlign: 'center',
    }
  });
  