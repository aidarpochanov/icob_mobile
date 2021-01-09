import React from 'react'
import Stack from '../stack'
import Register from './register'
import Login from './login'

export default function AuthStack({navigation}){
    return(
      <Stack.Navigator initialRouteName="Log in">
        <Stack.Screen
          name="Log in"
          component={Login}
          options={{
            title: 'Log in', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Register', //Set Header Title
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    )
  }