import React, {useContext} from 'react'
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer'
import matchListStack from './matches/match-stack'
import playerListStack from './players/player-stack'
import CustomSidebarMenu from './sidebar-menu'

const Drawer = createDrawerNavigator();

export default function Index(){

  return(
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e81e63',
          itemStyle: { marginVertical: 5 }
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
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
