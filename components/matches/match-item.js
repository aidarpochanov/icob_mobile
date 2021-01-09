import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function MatchItem(props) {

    const matchClicked = (item, isFutureMatch) => {
      props.navigation.navigate('Match Detail', {match: item, opposition: item.opposition, isFutureMatch: isFutureMatch})
    }

    return(
        <TouchableOpacity onPress={() => matchClicked(props.match, props.isFutureMatch)}>
            <View style={styles.item}>
                <Text adjustsFontSizeToFit={true} style={styles.itemText}>{`${props.match.opposition} ${props.match.date}`}</Text>
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
  