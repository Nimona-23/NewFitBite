import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import du LinearGradient
import Button from '../../components/Button';
import { COLORS } from '../../styles/colors';
import Header from './Header';

const GroceriesListScreen = ({ navigation }) => {
  const [groceries, setGroceries] = useState([
    { name: 'Bread', quantity: '2' },
    { name: 'Tomato', quantity: '1 Kg' },
    { name: 'Cheese', quantity: '200g' },
    { name: 'Pepper', quantity: '5' },
  ]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log({ title, description });
    alert('Groceries added successfully!');
    setTitle('');
    setDescription('');
  };

  const handleUpdateGrocery = (index, field, value) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((grocery, idx) =>
        idx === index ? { ...grocery, [field]: value } : grocery
      )
    );
  };

  const handleAddGrocery = () => {
    const newItem = {
      name: 'New Item',
      quantity: '1',
    };
    setGroceries((prevGroceries) => [...prevGroceries, newItem]);
  };

  const handleDeleteGrocery = (index) => {
    setGroceries((prevGroceries) => prevGroceries.filter((_, idx) => idx !== index));
  };

  // Fonction pour revenir à l'écran précédent
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.background.colors}
      locations={COLORS.gradients.background.locations}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Header
          onMorePress={() => console.log('More button pressed')}
          navigation={navigation} // Pass navigation prop
        />
      </View>

      <View style={styles.bbb}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={COLORS.primary.dark} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>Your Groceries List</Text>

      {/* Grocery List */}
      <FlatList
        data={groceries}
        keyExtractor={(_, index) => index.toString()} // Utilisation de l'index comme clé
        renderItem={({ item, index }) => (
          <View style={styles.groceryItem}>
            <Feather name="grid" size={20} color={COLORS.text.secondary} style={styles.dragIcon} />
            <TextInput
              style={styles.groceryInput}
              value={item.name}
              onChangeText={(text) => handleUpdateGrocery(index, 'name', text)} // Met à jour le nom
            />
            <TextInput
              style={styles.quantityInput}
              value={item.quantity}
              onChangeText={(text) => handleUpdateGrocery(index, 'quantity', text)} // Met à jour la quantité
            />
            {/* Bouton de suppression */}
            <TouchableOpacity onPress={() => handleDeleteGrocery(index)} style={styles.deleteButton}>
              <Feather name="trash-2" size={24} color={COLORS.ui.danger} />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} style={styles.submitButton} />

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddGrocery}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  groceryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ui.cardBackground,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  dragIcon: {
    marginRight: 10,
  },
  groceryInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text.dark,
  },
  quantityInput: {
    fontSize: 16,
    color: COLORS.text.secondary,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: COLORS.primary.dark,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 50,
  },
  deleteButton: {
    marginLeft: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: COLORS.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bbb: {
    paddingBottom: 15,
    paddingTop: 5,
    paddingLeft: 10,
  },
});

export default GroceriesListScreen;
