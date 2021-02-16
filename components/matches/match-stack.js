import React from 'react'
import NavigationDrawerStructure from '../navigation-structure'
import Stack from '../stack'
import {Button, Alert} from 'react-native'
import MatchList from './match-list'
import Availability from './availability'
import MatchDetail from './match-detail'


export default function matchListStack({navigation}){

    const checkMOTMVotes = (props) => {
      let player_votes = {}
      var vote;
      for (vote of props.player_votes) {
        if (vote.player_voted_for.id in player_votes){
          player_votes[vote.player_voted_for.id][1]++;
        }
        else {
          player_votes[vote.player_voted_for.id] = [`${vote.player_voted_for.name} ${vote.player_voted_for.surname}`, 1];
        }
      }
      let message = ''

      for (var key in player_votes){
        message = message + `${player_votes[key][0]}: ${player_votes[key][1]}` + '\n'
      }

      Alert.alert(message)
    }

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
                          onPress={() => {
                            checkMOTMVotes({player_votes: route.params.match.player_votes}) 
                          }}    
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