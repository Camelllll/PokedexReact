import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

const Equipe = () => {
    const [selectedPokemon, setSelectedPokemon] = useState([]);

    const pokemonList = [
        { id: 1, name: 'Pikachu' },
        { id: 2, name: 'Bulbasaur' },
        { id: 3, name: 'Charmander' },
        { id: 4, name: 'Squirtle' },
        // Ajoutez d'autres Pokémon à la liste
    ];

    const handlePokemonSelection = (pokemon) => {
        setSelectedPokemon([...selectedPokemon, pokemon]);
    };

    return (
        <View>
            <Text>Équipe</Text>
            <FlatList
                data={pokemonList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePokemonSelection(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Text>Sélectionnés :</Text>
            <FlatList
                data={selectedPokemon}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
        </View>
    );
};

export default Equipe;
