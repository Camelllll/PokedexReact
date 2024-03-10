import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

function hexToRGBA(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const PokemonCard = ({ pokemon, onRemove }) => {
    const backgroundColor = hexToRGBA(typeColors[pokemon.types[0]], 0.2);
  
    return (
      <View style={[styles.pokemonRow, { backgroundColor }]}>
        <View style={styles.leftContainer}>
          <Text style={styles.pokemonId}>N°{pokemon.id}</Text>
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
        </View>
        <View style={styles.rightContainer}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => onRemove(pokemon)}>
            <Icon name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
        <View style={styles.typeContainer}>
          {pokemon.types.map(type => (
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
    );
  };

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 350,
    height: 120, 
    alignItems: 'center', 
    marginTop: 40,
    marginLeft: 20,
    marginRight: 2,
    paddingHorizontal: 12,
  },
  removeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 45,
    right: 5,
  },
  image: {
    width: 130,
    height: 110,
    marginRight: 30,
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

export default PokemonCard;