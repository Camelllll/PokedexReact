import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import PokeList from './Pages/PokeList';
import PokeListDetails from './Pages/PokeListDetails';

const HomeScreen = ({ navigation }) => {
  const handleImagePress = () => {
    navigation.navigate('PokedexMain'); 
  };

  return (
    <TouchableOpacity onPress={handleImagePress} style={styles.container}>
      <Image
        source={require('./assets/pikachu.png')}
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
              <Text style={{ color: '', fontWeight: 'bold', fontSize: 30 }}>Pokédex</Text>
            </View>
          ),
          }}
        />
        <Stack.Screen 
          name="PokeListDetails" 
          component={PokeListDetails} 
          options={{ headerShown: false }}
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
    width: 400,
    height: 300,
    marginTop: 250,
    resizeMode: 'contain',
  },
  loadingImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default App;
