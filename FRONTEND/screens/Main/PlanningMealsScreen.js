import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS } from '../../styles/colors';
import Header from './Header';
import Button from '../../components/Button'; // Import du composant Button
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PlanningMealsScreen = ({ navigation }) => {
  const meals = [
    { type: 'BREAKFAST', icon: require('../../assets/images/breakfast.png') },
    { type: 'LUNCH', icon: require('../../assets/images/lunch.png') },
    { type: 'DINNER', icon: require('../../assets/images/dinner.png') },
    { type: 'SNACKS', icon: require('../../assets/images/snacks.png') },
  ];

  const handlePress = () => {
    navigation.navigate('RecipiesScreen');  // Modifier avec le nom de l'écran de destination
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
      <View style={styles.header}>
        <Header
          onMorePress={() => console.log('More button pressed')}
          navigation={navigation}
        />
      </View>

      <View style={styles.bbb}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Feather name="arrow-left" size={24} color={COLORS.primary.dark} />
        </TouchableOpacity>
      </View>
      {/* Meal Cards */}
      <ScrollView style={styles.mealContainer}>
        {meals.map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <Image source={meal.icon} style={styles.mealIcon} />
            <Text style={styles.mealText}>{meal.type}</Text>
            <TouchableOpacity style={styles.addButton} onPress={handlePress}>
              <Feather name="plus" size={24} color="#006A6A" />
            </TouchableOpacity>
          </View>
        ))}
        <Button
          title="Create shopping list"
          onPress={() => navigation.navigate('GroceriesList')}
          style={styles.button}
        />
      </ScrollView>
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
  mealContainer: {
    padding: 20,
  },
  mealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary.light,
    marginVertical: 10,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.secondary.dark,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary.dark,
  },
  mealIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
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

  mealText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: COLORS.ui.addButton,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
  },
  // Style pour le bouton circulaire de retour

});

export default PlanningMealsScreen;
