import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import PokemonCard from './PokemonCard';


const TeamCrew = () => {
  const [team, setTeam] = useState([]);

  const removeFromTeam = async (pokemon) => {
    try {
      let team = await AsyncStorage.getItem('@team');
      if (team) {
        team = JSON.parse(team);
        const index = team.findIndex(p => p.id === pokemon.id);
        if (index !== -1) {
          team.splice(index, 1);
          await AsyncStorage.setItem('@team', JSON.stringify(team));
          setTeam(team);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchTeam = async () => {
        try {
          let team = await AsyncStorage.getItem('@team');
          if (team) {
            setTeam(JSON.parse(team));
          }
        } catch (e) {
          console.error(e);
        }
      };
  
      fetchTeam();
    }, [])
  );

  return (
    <View>
    <FlatList
      data={team}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PokemonCard pokemon={item} onRemove={removeFromTeam} />
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});

export default TeamCrew;