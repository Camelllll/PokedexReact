import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button, Platform, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Account = () => {

    const [image, setImage] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);

    const validateFields = () => {
      let isValid = true;

      if (firstName.trim() === '') {
        setFirstNameError('Le prénom est requis');
        isValid = false;
      } else {
        setFirstNameError(null);
      }

      if (lastName.trim() === '') {
        setLastNameError('Le nom est requis');
        isValid = false;
      } else {
        setLastNameError(null);
      }

      return isValid;
    };

    const handleSubmit = () => {
      if (validateFields()) {
        alert('Vous voilà enregistré !');
      }
    };

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Désolé, nous avons besoin de la permission de la caméra pour que cela fonctionne !');
            }
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
          }
      };

      return (
        <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: image || 'https://www.pokepedia.fr/images/thumb/5/56/Dresseur-SSBU.png/1200px-Dresseur-SSBU.png' }}
          />
        </View>
        <View style={styles.infoContainer}>
          <Button style={styles.imgPicker} title="Choisir une image" onPress={pickImage} />
          <TextInput
            style={styles.input}
            onChangeText={setFirstName}
            value={firstName}
            placeholder="Prénom"
          />
          {firstNameError && <Text style={styles.errorText}>{firstNameError}</Text>}
          <TextInput
            style={styles.input}
            onChangeText={setLastName}
            value={lastName}
            placeholder="Nom"
          />
          {lastNameError && <Text style={styles.errorText}>{lastNameError}</Text>}
          <Button title="Soumettre" onPress={handleSubmit} />
          <Text style={styles.infoText}>Région: Kanto</Text>
          <Text style={styles.infoText}>Poids: 80kg</Text>
          <Text style={styles.infoText}>Starter choisi: Bulbizarre</Text>
        </View>
      </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        overflow: 'hidden',
        marginBottom: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        width: '80%',
        alignItems: 'center',
    },
    imgPicker: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
    },
});

export default Account;