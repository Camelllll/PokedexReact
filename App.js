import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import PokeList from './Pages/PokeList';
import PokeListDetails from './Pages/PokeListDetails';
import { Animated } from 'react-native';
import { useEffect, useState } from 'react';


const typeColors = {
  normal: '#AAA67F',
  fire: '#F57D31',
  water: '#6493EB',
  electric: '#F9CF30',
  grass: '#74CB48',
  ice: '#9AD6DF',
  fighting: '#C12239',
  poison: '#A43E9E',
  ground: '#DEC16B',
  flying: '#A891EC',
  psychic: '#FB5584',
  bug: '#A7B723',
  rock: '#B69E31',
  ghost: '#70559B',
  dragon: '#7037FF',
  dark: '#75574C',
  steel: '#B7B9D0',
  fairy: '#E69EAC',
};

const HomeScreen = ({ navigation }) => {
  const [animationValue] = useState(new Animated.Value(1));

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const handleImagePress = () => {
    navigation.navigate('PokedexMain'); 
  };

  return (
    <TouchableOpacity onPress={handleImagePress} style={styles.container}>
      <Animated.Text
        style={{
          ...styles.text,
          transform: [{ scale: animationValue }],
        }}
      >
        Bienvenue sur ton Pokédex !
      </Animated.Text>
      <Animated.Text
        style={{
          ...styles.text,
          transform: [{ scale: animationValue }],
        }}
      >
        Appuie sur l'écran pour commencer
      </Animated.Text>
      <Image
        source={require('./assets/pikachu2.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const PokedexScreen = ({ navigation }) => {
  return (
    <PokeList />
  );
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fbd404',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="PokedexMain"
          component={PokedexScreen}
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#fff',
            headerLeft: null,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,
            },
            headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('./assets/file-pokeball-png-0.png')}
                style={{ width: 25, height: 25, marginRight: 20 }}
              />
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 30 }}>Pokédex</Text>
            </View>
          ),
          }}
        />
        <Stack.Screen 
          name="PokeListDetails" 
          component={PokeListDetails} 
          options={({ route, navigation }) => {
            const { pokemon } = route.params;
            return {
              headerStyle: {
                backgroundColor: typeColors[pokemon.types[0]],
                height: 100, 
              },
              headerTintColor: '#B8B8B8',
              headerTitle: '',
              headerLeft: () => (
                <View style={styles.headerLeftContainer}>
                  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Image source={require('./assets/img/arrow_backarrow.png')} style={styles.backButtonImage} />
                  </TouchableOpacity>
                  <Text style={styles.headerTitleText}>{pokemon.name}</Text>
                </View>
              ),
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fbd404',
  },
  image: {
    width: 420,
    height: 320,
    marginTop: 250,
    marginLeft: 43,
    resizeMode: 'contain',
  },
  loadingImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  backButton: {
    marginLeft: 10,
  },
  backButtonImage: {
    width: 35,
    height: 35,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexShrink: 1,
  },
  headerTitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,

  },
  backButtonImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});

export default App;
