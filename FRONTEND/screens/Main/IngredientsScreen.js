import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/colors';
import { Ionicons, Feather } from '@expo/vector-icons';
import Header from './Header';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { getIngredients, getRecipes } from '../../services/apiService';

const IngredientsScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [foods, setFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both ingredients and recipes
        const [ingredientsData, recipesData] = await Promise.all([
          getIngredients(),
          getRecipes()
        ]);

        // Combine and format the data
        const combinedData = [
          ...ingredientsData.map(item => ({
            ...item,
            type: 'ingredient'
          })),
          ...recipesData.map(item => ({
            ...item,
            type: 'recipe'
          }))
        ];

        setFoods(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleItem = (item) => {
    if (selectedItems.find(selected => selected._id === item._id)) {
      // Remove item
      setSelectedItems(selectedItems.filter(selected => selected._id !== item._id));
      setTotalCalories(prev => prev - item.calories);
    } else {
      // Add item
      setSelectedItems([...selectedItems, item]);
      setTotalCalories(prev => prev + item.calories);
    }
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item');
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];

      const payload = {
        mealType: category,
        date: today,
        items: selectedItems.map(item => ({
          itemId: item._id,
          name: item.nom,
          calories: item.calories,
        }))
      };

      const response = await fetch('http://localhost:8080/api/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save meal');
      }

      const result = await response.json();
      console.log('Meal saved:', result);

      // Navigate back to home screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('Failed to save meal. Please try again.');
    }
  };

  const renderFoodItem = (item) => {
    const isSelected = selectedItems.find(selected => selected._id === item._id);

    return (
      <View style={styles.foodCard} key={item._id}>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{item.nom}</Text>
          <Text style={styles.foodType}>{item.type === 'recipe' ? 'Recipe' : 'Ingredient'}</Text>
          <Text style={styles.foodCalories}>{item.calories} kcal</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.addButton,
            isSelected && styles.selectedButton
          ]}
          onPress={() => toggleItem(item)}
        >
          <Feather
            name={isSelected ? 'check' : 'plus'}
            size={20}
            color={COLORS.primary.light}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const filteredFoods = foods.filter(item =>
    item.nom.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradient
      colors={COLORS.gradients.background.colors}
      locations={COLORS.gradients.background.locations}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Header
          onMorePress={() => console.log('More button pressed')}
          navigation={navigation}
        />
      </View>

      <View style={styles.bbb}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={COLORS.primary.dark} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{category}</Text>
      <Text style={styles.totalCalories}>Total Calories: {totalCalories}</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search ingredients or recipes..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.foodList}>
        {filteredFoods.length === 0 ? (
          <Text style={styles.noItemsText}>No items found</Text>
        ) : (
          filteredFoods.map(renderFoodItem)
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={`Add ${selectedItems.length} items to ${category}`}
          onPress={handleSubmit}
          style={styles.submitButton}
          disabled={selectedItems.length === 0}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Ajouté pour réduire la largeur des éléments généraux
  },
  headerContainer: {
    marginTop: 15,
    width: '100%',  // Largeur de l'entête reste pleine
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

    paddingTop: 5,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary.dark,
    marginBottom: 10,
    paddingTop: -20,
    textAlign: 'center',
    width: '80%',  // Réduit la largeur du titre
    alignSelf: 'center',  // Centre le titre
  },
  totalCalories: {
    fontSize: 16,
    color: '#9da8c3',
    marginBottom: 10,
    textAlign: 'center',
    width: '80%',  // Réduit la largeur des calories
    alignSelf: 'center',  // Centre les calories
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 15,
    width: '95%',  // Réduit la largeur de la barre de recherche
    alignSelf: 'center',  // Centre la barre de recherche

  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: '#555',
    fontSize: 15,
  },
  foodList: {
    flex: 1,
    width: '100%',  // Assurez-vous que la liste des aliments occupe toute la largeur disponible
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.secondary.light,
    width: '95%',  // Réduit la largeur des cartes alimentaires
    alignSelf: 'center',  // Centre les cartes
  },
  foodName: {
    fontSize: 16,
    color: '#1a1c24',
    fontWeight: 'bold',
  },
  foodCalories: {
    fontSize: 14,
    color: '#9da8c3',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.ui.addButton,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',  // Réduit la largeur du conteneur du bouton
    alignSelf: 'center',  // Centre le bouton
  },
  submitButton: {
    marginTop: 20,
    width: '100%',  // Largeur complète pour le bouton submit
  },
});

export default IngredientsScreen;
