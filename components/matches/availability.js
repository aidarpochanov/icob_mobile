import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FetchingIndicator from 'react-native-fetching-indicator';

export default function Availability(props) {

    const [available, setAvailable] = useState(null)
    const [loading, setLoading] = useState(false)
    let token = null

    const getAvailability = async (match_id) => {
        token = await AsyncStorage.getItem('icob-token');
        setLoading(true)
        fetch(`https://icob-app.herokuapp.com/mainapp/matches/${match_id}/check_availability/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.json()) 
        .then(jsonRes => {
            setAvailable(jsonRes.available)
            // console.log(jsonRes.available)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAvailability(props.route.params.match_id);
    }, [])
    

    const toggleAvailability = async (props, match_id) => {
        token = await AsyncStorage.getItem('icob-token');
        if(available){
            fetch(`https://icob-app.herokuapp.com/mainapp/matches/${match_id}/remove_player/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(res => res.json()) 
            .then(jsonRes => Alert.alert(jsonRes.response))
            .catch(error => console.log(error))
        } else {
            fetch(`https://icob-app.herokuapp.com/mainapp/matches/${match_id}/add_player/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(res => res.json()) 
            .then(jsonRes => Alert.alert(jsonRes.response))
            .catch(error => console.log(error))
        }
        props.navigation.navigate("Match List")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => toggleAvailability(props, props.route.params.match_id)}>
            { loading
                ? null 
                : (available 
                    ? <Text style={styles.viewText}>You have signed up already. I am not available anymore</Text> : 
                    <Text style={styles.viewText}>You haven't signed up yet. Sign up for this game</Text>)
            }
            </TouchableOpacity>
            <FetchingIndicator isFetching={loading} message="Fetching availability" backdropColor='rgba(0, 0, 0, 0.50)' color='blue'/>
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
  viewText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10
 }
});
