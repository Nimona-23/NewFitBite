import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/colors';
import { Ionicons, Feather } from '@expo/vector-icons';
import Header from './Header';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import { getIngredients } from '../../services/apiService';
import { getRecipes } from '../../services/apiService';

const IngredientsScreen = ({ navigation, route }) => {
  const { category } = route.params; // Catégorie transmise depuis HomeScreen
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [foods, setFoods] = useState([]); // Liste dynamique
  const [trimestre, setTrimestre] = useState(''); // Info utilisateur connecté
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    // Récupérer trimestre de l'utilisateur connecté
    const userTrimestre = 'first'; // Exemple statique, à remplacer par l'info utilisateur
    setTrimestre(userTrimestre);

    // Récupérer les ingrédients et recettes filtrées
    const fetchData = async () => {
      try {
        // Appel pour les ingrédients
        // const ingredientsResponse = await fetch('http://localhost:8080/api/getIngredients');
        const ingredientsData = await getIngredients();
        // const ingredientsData = await ingredientsResponse.json();

        // Appel pour les recettes avec filtre dynamique
        const recettesData = await getRecipes();

        // Fusionner les ingrédients et les recettes
        const combinedData = [...ingredientsData, ...recettesData];
        setFoods(combinedData);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
      }
    };
    console.log('Updated selectedItems:', selectedItems);

    fetchData();
  }, [category, selectedItems]); // Dépendance ajoutée pour recharger les données si la catégorie change

  const saveMeal = async (item, isAdding) => {
    const mealType = { category }; // Replace with the actual meal type
    const endpoint = `http://localhost:8080/api/meals`;

    const payload = {
      mealType,
      date: new Date().toISOString().split("T")[0], // Today's date
      item: {
        itemId: item._id,
        name: item.name,
        calories: item.calories,
      },

    };

    try {
      const response = await fetch(endpoint, {
        method: isAdding ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error saving meal:", error);
    }
  };


  const toggleItem = (item) => {
    console.log("Toggling item with id:", item._id);

    if (selectedItems.includes(item._id)) {
      // If item is already selected, remove it
      setSelectedItems(selectedItems.filter((id) => id !== item._id));
      setTotalCalories(totalCalories - item.calories);
      saveMeal(item, false); // Remove from the table
    } else {
      // If item is not selected, add it
      setSelectedItems([...selectedItems, item._id]);
      setTotalCalories(totalCalories + item.calories);
      saveMeal(item, true); // Add to the table
    }
  };




  const renderFoodItem = (item) => (
    <View style={styles.foodCard} key={item._id}>
      <Text style={styles.foodName}>{item.nom}</Text>
      <Text style={styles.foodCalories}>{item.calories} kcal</Text>
      <TouchableOpacity
        style={[
          styles.addButton,
          selectedItems.includes(item._id) && { backgroundColor: COLORS.primary.dark },
        ]}
        onPress={() => toggleItem(item._id)}
      >
        <Feather
          name={selectedItems.includes(item._id) ? 'check' : 'plus'}
          size={20}
          color={COLORS.primary.light}
        />
      </TouchableOpacity>
    </View>
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log({ title, description });
    alert('Items added successfully!');
    setTitle('');
    setDescription('');
  };

  // Fonction pour revenir à l'écran précédent
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={COLORS.gradients.background.colors}
      locations={COLORS.gradients.background.locations}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header
          onMorePress={() => console.log('More button pressed')}
          navigation={navigation}
        />
      </View>

      {/* Back Button */}
      <View style={styles.bbb}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={COLORS.primary.dark} />
        </TouchableOpacity>
      </View>



      {/* Title */}
      <Text style={styles.title}>{category}</Text>
      <Text style={styles.totalCalories}>Total Calories: {totalCalories}</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Looking for something?"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.hhh}></View>

      {/* Food List */}
      <ScrollView style={styles.foodList}>
        {foods.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No items found</Text>
        ) : (
          foods.map((item) => renderFoodItem(item))
        )}
      </ScrollView>


      {/* Add to Breakfast Button */}
      <View style={styles.buttonContainer}>
        <Button title="Add items" onPress={handleSubmit} style={styles.submitButton} />
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
