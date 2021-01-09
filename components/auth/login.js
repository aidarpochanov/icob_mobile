import React, { useState, useContext } from 'react';
import {StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './context'

export default function Login(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { logIn } = useContext(AuthContext)

    const navigateToRegister = () => {
        props.navigation.navigate("Register")
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
            <Button title="Login" onPress={() => logIn({username, password})}/>
            <TouchableOpacity onPress={() => navigateToRegister()}>
                <Text style={styles.viewText}>Don't have an account? Register here.</Text>
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
  