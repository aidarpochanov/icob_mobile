import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Button, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchingIndicator from 'react-native-fetching-indicator';


export default function Detail(props) {

    const match = props.navigation.getParam('match', null)
    const [players, setPlayers] = useState([])
    const [loading, setLoading] = useState(false)
    let token = null

    const getData = async (match) => {
        token = await AsyncStorage.getItem('icob-token');
        // console.log("in getdata"+token)
        if (token) {
            getPlayers(match)
        } else {
            props.navigation.navigate('Auth')
        }
    }

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

    const playerClicked = async (player) => {
        token = await AsyncStorage.getItem('icob-token');
        fetch(`https://icob-app.herokuapp.com/mainapp/matches/${item.id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.json()) 
        .then(jsonRes => {
            setPlayers(jsonRes.players)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        // console.log("Detail"+token)
        getData(match)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.centeredText}>Click on one of the players to vote MOTM:</Text>
            <FlatList  
                data={players}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => playerClicked(item)}>
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.name + " " + item.surname}</Text>
                            <View style={styles.lineStyle} />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor = {(item, index) => item.id.toString()}
            />
            <FetchingIndicator isFetching={loading} message="Fetching players" backdropColor='rgba(0, 0, 0, 0.50)' color='blue'/>
        </View>
    );
}

Detail.navigationOptions = screenProps => ({
    title: screenProps.navigation.getParam('opposition'),
    headerRight: () => {
        if(screenProps.navigation.getParam('isFutureMatch')){
            return (
                <Button 
                    title="Availability"
                    onPress={() => {
                        screenProps.navigation.navigate("Availability", 
                        {
                            match_id: screenProps.navigation.getParam('match').id,
                        })
                    }}    
                />
            )
        } else {
            return (
                <Button 
                    title="Check MOTM Votes"
                    onPress={() => {
                        screenProps.navigation.navigate("Availability", 
                        {
                            match_id: screenProps.navigation.getParam('match').id,
                        })
                    }}    
                />
            )
        }
    }
})

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
