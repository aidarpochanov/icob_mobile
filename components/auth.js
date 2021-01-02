import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Auth(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [regView, setRegView] = useState(false)

    useEffect(() => {
        getToken()
    }, [])

    const auth = () => {
        if(!regView){
            fetch('https://icob-app.herokuapp.com/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            })
            .then(res => res.json()) 
            .then(jsonRes => {
                saveToken(jsonRes.token)
                props.navigation.navigate("MatchList");
            })
            .catch(error => console.log(error))
        } else {
            fetch('https://icob-app.herokuapp.com/mainapp/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: username, password: password})
            })
            .then(res => res.json()) 
            .then(jsonRes => {
                setRegView(false)
            })
            .catch(error => console.log(error))
        }
    };

    const saveToken = async (token) => {
        await AsyncStorage.setItem('icob-token', token)
    }

    const getToken = async () => {
        const t = await AsyncStorage.getItem('icob-token')
        if(t) props.navigation.navigate("MatchList") 
    }

    const toggleView = () => {
        setRegView(!regView)
    }


    return(
        <View style={styles.container}>
            <Text style={styles.viewText}>
                Username
            </Text>
            <TextInput
              placeholder="Username"
              onChangeText={text => setUsername(text)}
              value={username}
              style={styles.input}
              autoCapitalize={'none'}
            />
            <Text style={styles.viewText}>
                Password
            </Text>
            <TextInput
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              value={password}
              style={styles.input}
              autoCapitalize={'none'}
              secureTextEntry={true}
            />
            <Button onPress={()=> auth()} title={regView ? "Register" : "Login"}/>
            <TouchableOpacity onPress={() => toggleView()}>
                {regView ? <Text style={styles.viewText}>Already have an account? Go back to login.</Text> : 
                <Text style={styles.viewText}>Don't have an account? Register here.</Text>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282C35',
      padding: 10
    },
    input:{
        backgroundColor: "#fff",
        fontSize: 24,
        padding: 10,
        margin: 10
    },
    viewText: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10
    }
  });
  