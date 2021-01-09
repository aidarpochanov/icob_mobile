import React from 'react'
import NavigationDrawerStructure from '../navigation-structure'
import Stack from '../stack'
import PlayerList from './player-list'
import PlayerDetail from './player-detail'


export default function playerListStack({navigation}){
    return (
      <Stack.Navigator initialRouteName="Player List">
        <Stack.Screen
          name="Player List"
          component={PlayerList}
          options={{
            title: "Player List", //Set Header Title
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
          name="Player Detail"
          component={PlayerDetail}
          options={({route, navigation})=>({
            title: `${route.params.player.name} ${route.params.player.surname}`, //Set Header Title
            // title: "asd",
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
          })}
        />
      </Stack.Navigator>
    )
  }
  