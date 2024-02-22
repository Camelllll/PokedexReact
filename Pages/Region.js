import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground} from 'react-native';
import axios from 'axios';

const regionImages = {
    kanto: 'https://scarletviolet.pokemon.com/_images/news/aug_3/world-map.jpg',
    johto: 'https://idata.over-blog.com/2/81/29/14/Les-jeux/380.jpg',
    hoenn: 'https://www.pokepedia.fr/images/4/4c/Carte_de_Hoenn_ROSA.png',
    sinnoh: 'https://www.pokepedia.fr/images/thumb/9/99/Sinnoh-DEPS.png/1200px-Sinnoh-DEPS.png',
    unova: 'https://i.etsystatic.com/11277520/r/il/93b1af/2387738058/il_fullxfull.2387738058_54au.jpg',
    kalos: 'https://www.pokepedia.fr/images/d/d1/Kalos_-_XY.png',
    alola: 'https://www.pokebip.com/pages/jeuxvideo/pokemon_soleil_lune_sun_moon/images/region/alolab.png',
    galar: 'https://jeuxpourtous.org/wp-content/uploads/2019/11/Épée-et-bouclier-Pokemon-Région-de-Galar-Carte.png',
    hisui: 'https://www.pokepedia.fr/images/thumb/c/cb/Hisui_-_LPA.png/1200px-Hisui_-_LPA.png',
    paldea: 'https://www.pokepedia.fr/images/thumb/8/88/Paldea_-_EV.png/1200px-Paldea_-_EV.png',
  };

const Regions = () => {
    const [regions, setRegions] = useState([]);
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    useEffect(() => {
        const fetchRegions = async () => {
            try {
              const response = await axios.get('https://pokeapi.co/api/v2/region');
              const data = response.data.results;
          
              const regionsWithDetails = await Promise.all(data.map(async (region) => {
                const response = await axios.get(region.url);
                const details = response.data;
                return {
                  ...region,
                  id: details.id,
                  imageUrl: regionImages[region.name],
                };
              }));
          
              setRegions(regionsWithDetails);
            } catch (error) {
              console.error('Erreur lors de la récupération des régions:', error);
            }
          };

        fetchRegions();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>

            <FlatList
                data={regions}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                <ImageBackground source={{ uri: item.imageUrl }} style={styles.regionCard}>
                <View style={styles.overlay}>
                    <Text style={styles.region}>{capitalizeFirstLetter(item.name)}</Text>
                    <Text style={styles.id}>{item.id}° GÉNÉRATION</Text>
                </View>
                </ImageBackground>
                )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 20,
      },
      card: {
        width: '100%',
        padding: 30,
      },
      regionCard: {
        width: '100%',
        height: 120,
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        borderRadius: 10,
        backgroundColor: 'black',
        marginBottom: 10,
      },
      ImageBackground: {
        borderRadius: 10,
      },
      region: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
      },
      id: {
        fontSize: 14,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});

Regions.navigationOptions = {
    headerShown: false,
  };

export default Regions;
