import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../styles/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import Header from "./Header";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const PlannigScreen = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkedRecipes, setCheckedRecipes] = useState({});

  const { category } = route.params;

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryLower = category.toLowerCase();
      const response = await fetch(
        `http://192.168.56.1:5000/api/recettes?categorie=${categoryLower}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const filteredData = data.filter((recipe) =>
        recipe.categorie.some((cat) => cat.toLowerCase() === categoryLower)
      );

      setRecipes(filteredData);
      setCheckedRecipes(
        filteredData.reduce((acc, recipe) => {
          acc[recipe._id] = false; // Initialize all as unchecked
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
      setError(
        "Impossible de charger les recettes. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nom.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleCheck = (id) => {
    setCheckedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderRecipeItem = (recipe) => (
    <TouchableOpacity
      key={recipe._id}
      style={styles.recipeCard}
      onPress={() =>
        navigation.navigate("ParentComponent", { recipeId: recipe._id })
      }
      activeOpacity={0.7}
    >
      <View style={styles.recipeInfo}>
        <View style={styles.recipeDetailsContainer}>
          <Text style={styles.recipeName} numberOfLines={1}>
            {recipe.nom}
          </Text>
          {recipe.description && (
            <Text style={styles.recipeDescription} numberOfLines={2}>
              {recipe.description}
            </Text>
          )}
          {recipe.tempsPreparation && (
            <View style={styles.detailItem}>
              <Feather name="clock" size={14} color={COLORS.secondary.main} />
              <Text style={styles.detailText}>
                {recipe.tempsPreparation} min
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => toggleCheck(recipe._id)}
        >
          <View
            style={[
              styles.checkboxCircle,
              checkedRecipes[recipe._id] && styles.checked,
            ]}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <View style={styles.headerTop}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color={COLORS.primary.dark} />
        </TouchableOpacity>

        <Text style={styles.title}>{category} Recipes</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={20}
          color={COLORS.secondary.main}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${category.toLowerCase()} recipes...`}
          placeholderTextColor={COLORS.secondary.light}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Feather name="x" size={20} color={COLORS.secondary.main} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary.main} />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Feather name="alert-circle" size={40} color={COLORS.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchRecipes}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredRecipes.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Feather name="inbox" size={40} color={COLORS.secondary.main} />
          <Text style={styles.noRecipesText}>
            {searchText
              ? "No recipes found for your search"
              : `No ${category.toLowerCase()} recipes available`}
          </Text>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.recipeList}
        showsVerticalScrollIndicator={false}
      >
        {filteredRecipes.map(renderRecipeItem)}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={COLORS.gradients.background.colors}
        locations={COLORS.gradients.background.locations}
        style={styles.container}
      >
        {renderHeader()}
        {renderContent()}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary.light,
  },
  container: {
    flex: 1,
  },
  headerSection: {
    padding: 16,
    backgroundColor: "transparent",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary.dark,
    textAlign: "center",
    marginRight: 52,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 46,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary.dark,
  },
  recipeList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeInfo: {
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start", // Align text elements vertically
  },
  recipeDetailsContainer: {
    flexDirection: "column",
    flex: 1,
    marginRight: 12,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary.dark,
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: COLORS.secondary.main,
    marginBottom: 12,
    lineHeight: 20,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  detailText: {
    marginLeft: 6,
    color: COLORS.secondary.main,
    fontSize: 14,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 10, // Updated to a circle
    borderWidth: 2,
    borderColor: COLORS.primary.dark,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12, // Move circle to the right
  },
  checkboxCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "transparent",
  },
  checked: {
    backgroundColor: COLORS.primary.dark,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: COLORS.secondary.main,
  },
  errorText: {
    color: COLORS.error,
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: COLORS.primary.dark,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  noRecipesText: {
    color: COLORS.secondary.main,
    textAlign: "center",
  },
});

export default PlannigScreen;
