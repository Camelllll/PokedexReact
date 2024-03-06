import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchPokemonList } from '../Api';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import TeamCrew from './TeamCrew';
import Regions from './Region';
import Account from './Account';

const Tab = createBottomTabNavigator();

const PokeListWithTabNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Pokedex') {
        iconName = focused ? 'list' : 'list-outline';
      } else if (route.name === 'Team') {
        iconName = focused ? 'people' : 'people-outline';
      } else if (route.name === 'Régions') { 
        iconName = focused ? 'location' : 'location-outline'; 
      } else if (route.name === 'Compte') {
        iconName = focused ? 'person' : 'person-outline';
      } 

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]
      })}
    >
      <Tab.Screen 
        name="Pokedex" 
        component={PokeList} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Team" 
        component={TeamCrew} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Régions" 
        component={Regions} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Compte" 
        component={Account} 
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const PokeList = ({ navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');

  const handlePokemonClick = (pokemon) => {
    navigation.navigate('PokeListDetails', { pokemon });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonList();
        setPokemonList(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/ball.gif')} 
          style={{ width: 100, height: 100 }} 
        />
      </View>
      
    );
  }

  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  const filteredPokemonList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  function hexToRGBA(hex, opacity) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

const renderPokemonRow = ({ item }) => {
  const backgroundColor = hexToRGBA(typeColors[item.types[0]], 0.2);

  return (
    <TouchableOpacity onPress={() => handlePokemonClick(item)}>
    <View style={[styles.pokemonRow, { backgroundColor }]} >
      <View style={styles.leftContainer}>
        <Text style={styles.pokemonId}>N°{item.id}</Text>
        <Text style={styles.pokemonName}>{item.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      </View>
      <View style={styles.typeContainer}>
        {item.types.map(type => (
          <View
            key={type}
            style={[
              styles.typeCircle,
              { backgroundColor: typeColors[type] },
            ]}
          >
            <Text style={styles.pokemonType}>{type}</Text>
          </View>
        ))}
      </View>
    </View>
  </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Rechercher un Pokémon..."
      />
      <View style={styles.container2}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={filteredPokemonList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPokemonRow}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
};

export { PokeList, PokeListWithTabNavigator };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#fff',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  typeContainer: {
    position: 'absolute',
    top: '60%',
    left: '10%',
    flexDirection: 'row',
  },
  pokemonName: {
    marginLeft: 28,
    marginBottom: 40,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  pokemonType: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
pokemonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 12,
  width: 350,
  height: 120,
  alignItems: 'center', 
  marginTop: 40,
  marginLeft: 2,
  marginRight: 2,
  paddingHorizontal: 12,
},
  searchInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    width: 300,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginTop: 130,
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    marginRight: 10,
  },
  pokemonId: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  typeCircle: {
    width: 70,
    height: 30,
    borderRadius: 19,
    marginRight: 6,
    opacity: 0.7,
  },
});

export default PokeListWithTabNavigator;