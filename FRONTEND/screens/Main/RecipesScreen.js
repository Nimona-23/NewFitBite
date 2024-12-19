// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// // } from "react-native";
// // import { COLORS } from "../../styles/colors";
// // import { LinearGradient } from "expo-linear-gradient";
// // import Button from "../../components/Button"; // Import du composant Button
// // import Header from "./Header";

// // const RecipesScreen = ({ navigation }) => {
// //   const [activeFilter, setActiveFilter] = useState("Breakfast");

// //   // Liste des filtres horizontaux
// //   const filters = ["Breakfast", "Lunch", "Dinner", "Snacks"];

// //   // Données des recettes pour chaque filtre
// //   const recipes = {
// //     Breakfast: [
// //       {
// //         id: 1,
// //         title: "Cake",
// //         duration: "15 min.",
// //         image: require("../../assets/images/cake.png"),
// //       },
// //       {
// //         id: 2,
// //         title: "Cake",
// //         duration: "10 min.",
// //         image: require("../../assets/images/cake.png"),
// //       },
// //     ],
// //     Lunch: [
// //       {
// //         id: 3,
// //         title: "Salad",
// //         duration: "10 min.",
// //         image: require("../../assets/images/salad.png"),
// //       },
// //       {
// //         id: 4,
// //         title: "Salad",
// //         duration: "20 min.",
// //         image: require("../../assets/images/salad.png"),
// //       },
// //     ],
// //     Dinner: [
// //       {
// //         id: 5,
// //         title: "Pumpkin Soup",
// //         duration: "15 min.",
// //         image: require("../../assets/images/pumkin-soup.jpg"),
// //       },
// //       {
// //         id: 6,
// //         title: "Pumpkin Soup",
// //         duration: "25 min.",
// //         image: require("../../assets/images/pumkin-soup.jpg"),
// //       },
// //     ],
// //     Snacks: [
// //       {
// //         id: 7,
// //         title: "Salad",
// //         duration: "10 min.",
// //         image: require("../../assets/images/salad.png"),
// //       },
// //       {
// //         id: 8,
// //         title: "Salad",
// //         duration: "5 min.",
// //         image: require("../../assets/images/salad.png"),
// //       },
// //     ],
// //   };

// //   // Récupérer les recettes pour le filtre actif
// //   const selectedRecipes = recipes[activeFilter];

// //   return (
// //     <LinearGradient
// //       colors={COLORS.gradients.background.colors}
// //       locations={COLORS.gradients.background.locations}
// //       style={styles.container}
// //     >
// //       {/* Header */}
// //       <View style={styles.headerContainer}>
// //         <Header date="2 May, Monday" navigation={navigation} />
// //       </View>

// //       {/* Filtres horizontaux */}
// //       <View style={styles.filterContainer}>
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           contentContainerStyle={styles.scrollBox}
// //         >
// //           {filters.map((filter) => (
// //             <TouchableOpacity
// //               key={filter}
// //               onPress={() => setActiveFilter(filter)}
// //               style={styles.filterButton}
// //             >
// //               {activeFilter === filter ? (
// //                 <LinearGradient
// //                   colors={[COLORS.primary.dark, COLORS.primary.main]}
// //                   style={styles.activeGradient}
// //                   start={{ x: 0, y: 0 }}
// //                   end={{ x: 1, y: 0 }}
// //                 >
// //                   <Text style={[styles.filterText, styles.activeText]}>
// //                     {filter}
// //                   </Text>
// //                 </LinearGradient>
// //               ) : (
// //                 <View style={styles.inactiveButton}>
// //                   <Text style={styles.filterText}>{filter}</Text>
// //                 </View>
// //               )}
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>
// //       </View>

// //       {/* Liste des recettes */}
// //       <ScrollView style={styles.scrollView}>
// //         <View style={styles.addButtonContainer}>
// //           <Button
// //             title="Add Your Own Recipe"
// //             onPress={() => navigation.navigate("addfood2")}
// //           />
// //         </View>

// //         {/* Cartes des recettes */}
// //         {selectedRecipes.map((recipe) => (
// //           <TouchableOpacity
// //             key={recipe.id}
// //             style={styles.recipeCard}
// //             onPress={() =>
// //               navigation.navigate("ParentComponent", { recipeId: recipe.id })
// //             }
// //           >
// //             <Image source={recipe.image} style={styles.recipeImage} />
// //             <View style={styles.recipeInfo}>
// //               <Text style={styles.recipeTitle}>{recipe.title}</Text>
// //               <Text style={styles.recipeDuration}>{recipe.duration}</Text>
// //             </View>
// //           </TouchableOpacity>
// //         ))}
// //       </ScrollView>
// //     </LinearGradient>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1 },
// //   headerContainer: { marginTop: 15 },
// //   scrollView: { flex: 1 },
// //   filterContainer: {
// //     backgroundColor: "#F2F5FC",
// //     borderRadius: 20,
// //     paddingVertical: 10,
// //     paddingHorizontal: 5,
// //     shadowColor: "#000",
// //     shadowOpacity: 0.1,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 5,
// //     elevation: 3,
// //     marginBottom: 10,
// //     marginLeft: 10,
// //     marginRight: 10,
// //   },
// //   scrollBox: { flexDirection: "row" },
// //   filterButton: { marginRight: 10, borderRadius: 25 },
// //   activeGradient: {
// //     borderRadius: 25,
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //   },
// //   inactiveButton: {
// //     borderRadius: 25,
// //     paddingHorizontal: 20,
// //     paddingVertical: 10,
// //   },
// //   filterText: { fontSize: 14, color: "#666" },
// //   activeText: { color: "#fff", fontWeight: "bold" },
// //   addButtonContainer: { marginHorizontal: 20, marginBottom: 20 },
// //   recipeCard: {
// //     backgroundColor: "white",
// //     borderRadius: 15,
// //     marginBottom: 20,
// //     overflow: "hidden",
// //     marginHorizontal: 20,
// //   },
// //   recipeImage: { width: "100%", height: 200, resizeMode: "cover" },
// //   recipeInfo: { padding: 15 },
// //   recipeTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
// //   recipeDuration: { color: "#666" },
// // });

// // export default RecipesScreen;
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import { COLORS } from "../../styles/colors";
// import { LinearGradient } from "expo-linear-gradient";
// import Button from "../../components/Button"; // Import du composant Button
// import Header from "./Header";
// import axios from "axios"; // Importation d'axios pour faire des requêtes HTTP

// const RecipesScreen = ({ navigation }) => {
//   const [activeFilter, setActiveFilter] = useState("Breakfast");
//   const [recipes, setRecipes] = useState({}); // État pour stocker les recettes récupérées
//   const [loading, setLoading] = useState(true); // État pour gérer le chargement
//   const [error, setError] = useState(null); // État pour gérer les erreurs

//   // Liste des filtres horizontaux
//   const filters = ["Breakfast", "Lunch", "Dinner", "Snacks"];

//   // Récupérer les recettes depuis l'API
//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/recettes"); // Remplacez par l'URL de votre API
//         const data = response.data; // Supposons que les recettes sont retournées sous forme d'objet
//         setRecipes(data); // Stocke les recettes dans l'état
//         setLoading(false); // Terminer le chargement
//       } catch (error) {
//         setError("Failed to fetch recipes"); // Gérer l'erreur
//         setLoading(false); // Terminer le chargement
//       }
//     };

//     fetchRecipes();
//   }, []); // L'effet ne s'exécute qu'une fois, lors du montage du composant

//   // Récupérer les recettes pour le filtre actif
//   const selectedRecipes = recipes[activeFilter] || [];

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={COLORS.primary.main} />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient
//       colors={COLORS.gradients.background.colors}
//       locations={COLORS.gradients.background.locations}
//       style={styles.container}
//     >
//       {/* Header */}
//       <View style={styles.headerContainer}>
//         <Header date="2 May, Monday" navigation={navigation} />
//       </View>

//       {/* Filtres horizontaux */}
//       <View style={styles.filterContainer}>
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.scrollBox}
//         >
//           {filters.map((filter) => (
//             <TouchableOpacity
//               key={filter}
//               onPress={() => setActiveFilter(filter)}
//               style={styles.filterButton}
//             >
//               {activeFilter === filter ? (
//                 <LinearGradient
//                   colors={[COLORS.primary.dark, COLORS.primary.main]}
//                   style={styles.activeGradient}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   <Text style={[styles.filterText, styles.activeText]}>
//                     {filter}
//                   </Text>
//                 </LinearGradient>
//               ) : (
//                 <View style={styles.inactiveButton}>
//                   <Text style={styles.filterText}>{filter}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Liste des recettes */}
//       <ScrollView style={styles.scrollView}>
//         <View style={styles.addButtonContainer}>
//           <Button
//             title="Add Your Own Recipe"
//             onPress={() => navigation.navigate("addfood2")}
//           />
//         </View>

//         {/* Cartes des recettes */}
//         {selectedRecipes.map((recipe) => (
//           <TouchableOpacity
//             key={recipe.id}
//             style={styles.recipeCard}
//             onPress={() =>
//               navigation.navigate("ParentComponent", { recipeId: recipe.id })
//             }
//           >
//             <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
//             <View style={styles.recipeInfo}>
//               <Text style={styles.recipeTitle}>{recipe.title}</Text>
//               <Text style={styles.recipeDuration}>{recipe.duration}</Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   headerContainer: { marginTop: 15 },
//   scrollView: { flex: 1 },
//   filterContainer: {
//     backgroundColor: "#F2F5FC",
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//     marginBottom: 10,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   scrollBox: { flexDirection: "row" },
//   filterButton: { marginRight: 10, borderRadius: 25 },
//   activeGradient: {
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   inactiveButton: {
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   filterText: { fontSize: 14, color: "#666" },
//   activeText: { color: "#fff", fontWeight: "bold" },
//   addButtonContainer: { marginHorizontal: 20, marginBottom: 20 },
//   recipeCard: {
//     backgroundColor: "white",
//     borderRadius: 15,
//     marginBottom: 20,
//     overflow: "hidden",
//     marginHorizontal: 20,
//   },
//   recipeImage: { width: "100%", height: 200, resizeMode: "cover" },
//   recipeInfo: { padding: 15 },
//   recipeTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
//   recipeDuration: { color: "#666" },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: { color: "red", fontSize: 18 },
// });

// export default RecipesScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/Button"; // Import du composant Button
import Header from "./Header";
import { getRecipes } from "../../services/apiService"; // Importation du service getRecipes

const RecipesScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState("Breakfast");
  const [recipes, setRecipes] = useState([]); // Changer l'état en tableau pour stocker les recettes
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState(null); // État pour gérer les erreurs

  // Liste des filtres horizontaux
  const filters = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  // Récupérer les recettes depuis l'API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes(); // Appeler la fonction getRecipes depuis le service
        setRecipes(data); // Stocker les recettes dans l'état
        setLoading(false); // Terminer le chargement
      } catch (error) {
        setError("Failed to fetch recipes"); // Gérer l'erreur
        setLoading(false); // Terminer le chargement
      }
    };

    fetchRecipes();
  }, []); // L'effet ne s'exécute qu'une fois, lors du montage du composant

  // Récupérer les recettes pour le filtre actif
  const selectedRecipes = recipes.filter(recipe => recipe.categorie === activeFilter);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary.main} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={COLORS.gradients.background.colors}
      locations={COLORS.gradients.background.locations}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header navigation={navigation} />
      </View>

      {/* Filtres horizontaux */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollBox}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={styles.filterButton}
            >
              {activeFilter === filter ? (
                <LinearGradient
                  colors={[COLORS.primary.dark, COLORS.primary.main]}
                  style={styles.activeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={[styles.filterText, styles.activeText]}>
                    {filter}
                  </Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveButton}>
                  <Text style={styles.filterText}>{filter}</Text>
                </View>
              )}s
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Liste des recettes */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.addButtonContainer}>
          <Button
            title="Add Your Own Recipe"
            onPress={() => navigation.navigate("addfood2")}
          />
        </View>

        {/* Cartes des recettes */}
        {selectedRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe.__id}
            style={styles.recipeCard}
            onPress={() =>
              navigation.navigate("ParentComponent", { recipeId: recipe.id })
            }
          >
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{recipe.nom}</Text>
              <Text style={styles.recipeDuration}>{recipe.duration}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { marginTop: 15 },
  scrollView: { flex: 1 },
  filterContainer: {
    backgroundColor: "#F2F5FC",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  scrollBox: { flexDirection: "row" },
  filterButton: { marginRight: 10, borderRadius: 25 },
  activeGradient: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inactiveButton: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterText: { fontSize: 14, color: "#666" },
  activeText: { color: "#fff", fontWeight: "bold" },
  addButtonContainer: { marginHorizontal: 20, marginBottom: 20 },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 20,
  },
  recipeImage: { width: "100%", height: 200, resizeMode: "cover" },
  recipeInfo: { padding: 15 },
  recipeTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  recipeDuration: { color: "#666" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: { color: "red", fontSize: 18 },
});

export default RecipesScreen;

