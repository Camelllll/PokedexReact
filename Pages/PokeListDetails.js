import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PokeListDetails = ({ route }) => {
  const { pokemon } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: pokemon.imageUrl }} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.typesContainer}>
        {pokemon.types.map((type, index) => (
          <Text key={index} style={styles.type}>
            {type}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
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
});

export default PokeListDetails;