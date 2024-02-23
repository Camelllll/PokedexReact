import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import axios from 'axios';

const startersByGeneration = {
  1: ['bulbasaur', 'charmander', 'squirtle'],
  2: ['chikorita', 'cyndaquil', 'totodile'],
  3: ['treecko', 'torchic', 'mudkip'],
  4: ['turtwig', 'chimchar', 'piplup'],
  5: ['snivy', 'tepig', 'oshawott'],
  6: ['chespin', 'fennekin', 'froakie'],
  7: ['rowlet', 'litten', 'popplio'],
  8: ['grookey', 'scorbunny', 'sobble'],
  9: ['sprigatito', 'fuecoco', 'quaxly'],
  10: ['adventu', 'flameu', 'aqua'],
};

const Equipe = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const starters = startersByGeneration[selectedGeneration];
      const pokemonData = await Promise.all(starters.map(async (name) => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.id}`);
        const frenchName = speciesResponse.data.names.find(name => name.language.name === 'fr').name;
        return {
          id: response.data.id,
          name: frenchName.charAt(0).toUpperCase() + frenchName.slice(1),
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${response.data.id}.png`,
        };
      }));
      setPokemonList(pokemonData);
    };

    fetchPokemonData();
  }, [selectedGeneration]);

  const handlePokemonSelection = (pokemon) => {
    setSelectedPokemon([pokemon]);
  };

  const handlePokemonRemoval = (pokemon) => {
    setSelectedPokemon(selectedPokemon.filter((p) => p.id !== pokemon.id));
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.pokepedia.fr/images/thumb/5/56/Dresseur-SSBU.png/1200px-Dresseur-SSBU.png' }} style={styles.dresseurImage} />
      <Text style={styles.title}>Bienvenue dans l'Aventure !</Text>
      <Text style={styles.subtitle}>Choisis ton starter préféré</Text>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Choisir la génération</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          {Object.keys(startersByGeneration).map((generation) => (
            <TouchableOpacity
                key={generation}
                style={styles.modalButton}
                onPress={() => {
                setSelectedGeneration(generation);
                setModalVisible(false);
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../assets/file-pokeball-png-0.png')}
                    style={{ width: 25, height: 25, marginRight: 20 }}
                />                
                <Text style={styles.modalButtonText}>{`Génération ${generation}`}</Text>
                </View>
            </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonTextClose}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePokemonSelection(item)} style={styles.pokemonContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.imageSelected} />
            <Text style={styles.namePokemon}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text>Sélectionnés :</Text>
      <FlatList
        data={selectedPokemon}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false} 
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePokemonRemoval(item)} style={styles.pokemonContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.imageSelected} />
            <Text style={styles.namePokemon}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSelected: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginTop: 20,
  },
  pokemonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
  },
  namePokemon: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  dresseurImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: 340,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalClose: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  modalButtonTextClose: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Equipe;