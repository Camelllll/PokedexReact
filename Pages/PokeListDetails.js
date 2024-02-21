import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TextInput } from 'react-native';
import { fetchPokemonList } from '../Api'; 

const typeColors = {
  normal: '#C8C4BC',
  fire: '#FFC1A1',
  water: '#A1D6E2',
  electric: '#FFFA92',
  grass: '#74CB48',
  ice: '#D1EECC',
  fighting: '#D9BF77',
  poison: '#A675A1',
  ground: '#CCAB7A',
  flying: '#A1A3D6',
  psychic: '#FF92A1',
  bug: '#C2D59B',
  rock: '#C4BC8C',
  ghost: '#787391',
  dragon: '#7768FC',
  dark: '#776854',
  steel: '#C4C4CE',
  fairy: '#D6A1AD',
};

const PokeListDetails = ({ route }) => {
  const { pokemon } = route.params;
  

  return (
    <View style={[styles.container, {backgroundColor: typeColors[pokemon.types[0]]}]}>
  <Image
    source={require('../assets/img/pokeballballed.png')}
    style={styles.pokeballImage}
  />
  <View style={styles.mainContent}>
  <Image style={styles.ImgPokemon} source={{ uri: pokemon.imageUrl }} />
    <View style={styles.card}>
    <Text style={styles.name}>{pokemon.name}</Text>
    <Text style={styles.id}>#{pokemon.id}</Text>
    <View style={styles.typesContainer}>
      {pokemon.types.map((type, index) => (
        <View key={index} style={[styles.typeCircle, {backgroundColor: typeColors[type]}]}>
          <Text style={styles.pokemonType}>{type}</Text>
        </View>
      ))}
    </View>
    <View style={styles.statsContainer}>
    <View style={styles.stat}>
      <View style={styles.statTop}>
        <Image source={require('../assets/img/weight-icon.png')} style={styles.statIcon} />
        <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
        </View>
        <Text style={styles.statLabel}>Poids</Text>
      </View>
      <View style={styles.statHeight}>
      <View style={styles.statTop}>
        <Image source={require('../assets/img/height-icon.png')} style={styles.statIcon} />
        <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
      </View>
        <Text style={styles.statLabel}>Hauteur</Text>
      </View>
    </View>
    <View style={styles.containerDesc}>
      <Text style={styles.desc}>Description</Text>
      <Text style={styles.description}>{pokemon.description}</Text>
    </View>
    <View style={styles.containerDesc}>
      <Text style={styles.desc}>Stats Bases</Text>
    </View>
  </View>
  </View>
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#B8B8B8',
  },
  ImgPokemon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    top: -190,
    right: 80,
    zIndex: 1,
  },
  mainContent: {
    zIndex: 1,
  },
  pokeballImage: {
    width: 230,
    height: 230,
    marginLeft: 140,
    resizeMode: 'contain',
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
    zIndex: 1,
  },
  id: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold',
  },
  card: {
    width: '95%',
    height: '70%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,  
    elevation: 5,
  },
  pokemonType: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  type: {
    fontSize: 18,
    marginRight: 10,
  },
  typeCircle: {
    width: 70,
    height: 30,
    borderRadius: 19,
    marginRight: 6,
    opacity: 0.7,
  },
  weight: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  statHeight: {
    flex: 1,
    alignItems: 'center',
  },
  statLast: {
    flex: 1,
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    marginLeft: 10,
  },
  backButtonImage: {
    width: 25,
    height: 25,
  },
  statTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: 'grey',
  },
  containerDesc: {
    marginTop: 20,
  },
  desc: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },

});

export default PokeListDetails;