import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function PlayerItem(props) {

    const playerClicked = (player) => {
        // console.log(player)
        props.navigation.navigate('Player Detail', {player: player})
    }

    return(
        <TouchableOpacity onPress={() => playerClicked(props.player)}>
            <View style={styles.item}>
                <Text adjustsFontSizeToFit={true} style={styles.itemText}>{`${props.player.name} ${props.player.surname}`}</Text>
                <View style={styles.lineStyle} />
            </View>
        </TouchableOpacity>
    )
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282C35',
      padding: 10
    },
    item: {
      flex: 1,
      padding: 10,
      height: 50,
      backgroundColor: '#282C35'
    },
    itemText: {
      color: '#fff',
      fontSize: 24
    },
    lineStyle:{
      borderBottomColor: '#fff',
      borderBottomWidth: 1,
    },
    centeredText:{
      color: '#fff',
      fontSize: 24,
      textAlign: 'center',
    }
  });
  