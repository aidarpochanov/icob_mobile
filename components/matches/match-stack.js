import React from 'react'
import NavigationDrawerStructure from '../navigation-structure'
import Stack from '../stack'
import {Button} from 'react-native'
import MatchList from './match-list'
import Availability from './availability'
import MatchDetail from './match-detail'


export default function matchListStack({navigation}){
    return(
      <Stack.Navigator initialRouteName="Match List">
        <Stack.Screen
          name="Match List"
          component={MatchList}
          options={{
            title: 'Match List', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
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
          name="Availability"
          component={Availability}
          options={{
            title: 'Availability', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
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
          name="Match Detail"
          component={MatchDetail}
          options={({route, navigation}) => ({
            title: route.params.match.opposition, //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
            ),
            headerRight: () => {
              if(route.params.isFutureMatch){
                  return (
                      <Button 
                          title="Availability"
                          onPress={() => {
                              navigation.navigate("Availability", 
                              {
                                  match_id: route.params.match.id,
                              }) 
                          }}    
                      />
                  )
              } else {
                  return (
                      <Button 
                          title="Check MOTM Votes"
                          onPress={() => {}}    
                      />
                  )
              }
            },
            headerStyle: {
              backgroundColor: 'black', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          })}
        />
      </Stack.Navigator>
    )
  }