import React, { useState, useContext } from 'react';
import {StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthContext from './context'

export default function Register(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    const { register } = useContext(AuthContext)

    const navigateToLogin = () => {
        props.navigation.navigate("Log in")
    }

    return(
        <ScrollView style={styles.container}>
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
            <Text style={styles.viewText}>
                Name
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={text => setName(text)}
              value={name}
              style={styles.input}
            //   autoCapitalize={'none'}
            />
            <Text style={styles.viewText}>
                Surname
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={text => setSurname(text)}
              value={surname}
              style={styles.input}
            //   autoCapitalize={'none'}
            />
            <Button title="Register" onPress={() => register({username, password})}/>
            <TouchableOpacity onPress={() => navigateToLogin()}>
                <Text style={styles.register}>Already have an account? Go back to login.</Text> 
            </TouchableOpacity>
        </ScrollView>
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
    },
    register: {
        color: 'white',
        fontSize: 20,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 20
    }
  });
  