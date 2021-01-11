import React, { useEffect, useMemo, useReducer, createContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Index from './components';
import AuthStack from './components/auth/auth-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from './components/auth/context'
import { Alert } from 'react-native'


function Application() {

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch(action.type){
        case 'RESTORE_TOKEN': 
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
        case 'REGISTER':
          return{
            ...prevState
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  )

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('icob-token');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [])

  const saveToken = async (token) => {
    await AsyncStorage.setItem('icob-token', token)
  }

  const authContext = useMemo(() => ({
      logIn: async data => {
        let token = await fetch('https://icob-app.herokuapp.com/auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: data.username, password: data.password})
        })
        .then(res => res.json()) 
        .then(jsonRes => {
            // console.log(jsonRes.token)
            saveToken(jsonRes.token)
            return jsonRes.token
        })
        .catch(error => console.log(error))
        dispatch({ type: 'SIGN_IN', token: token });
      },
      logOut: async () => {
        await AsyncStorage.removeItem('icob-token')
        dispatch({ type: 'SIGN_OUT' })
      },
      register: async data => {
        fetch('https://icob-app.herokuapp.com/mainapp/users/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({username: data.username, password: data.password, first_name: data.name, last_name: data.surname})
        })
        .then(res => res.json()) 
        .then(jsonRes => {
          Alert.alert(
            `Register complete`,
            `Registered player ${jsonRes.first_name} ${jsonRes.last_name} successfully`,
            [
              {
                text: 'Log in',
                onPress: () => data.props.navigation.navigate("Log in")
              }
            ]
          )
        })
        .catch(error => console.log(error))
        dispatch({ type: 'REGISTER'});
      },
    }), [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (<AuthStack />) : (<Index />)}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}


export default Application;

