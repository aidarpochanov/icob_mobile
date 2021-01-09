import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer'
import matchListStack from './components/matches/match-stack'
import playerListStack from './components/players/player-stack'


const Drawer = createDrawerNavigator();

function AppDrawer(){

  return(
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        >
        <Drawer.Screen
          name="Match List"
          options={{ drawerLabel: 'Matches' }}
          component={matchListStack}
        />
        <Drawer.Screen
          name="Player List"
          options={{ drawerLabel: 'Players' }}
          component={playerListStack}
        />
      </Drawer.Navigator>
  )
}


function Application() {
 
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  )
}


export default Application;

