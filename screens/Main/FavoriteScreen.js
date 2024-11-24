import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const FavoriteScreen = () => {
    const recipes = [
        {
            id: 1,
            title: 'PUMPKIN SOUP',
            duration: '15 min.',
            image: require('../../assets/images/pumkin-soup.jpg'),
        },
        {
            id: 2,
            title: 'PUMPKIN SOUP',
            duration: '15 min.',
            image: require('../../assets/images/pumkin-soup.jpg'),
        },
        {
            id: 3,
            title: 'PUMPKIN SOUP',
            duration: '15 min.',
            image: require('../../assets/images/pumkin-soup.jpg'),
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Looking for something?"
                    placeholderTextColor="#666"
                />
            </View>

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={[styles.filterButton, styles.filterButtonActive]}>
                        <Text style={[styles.filterText, styles.filterTextActive]}>Breakfast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterText}>Lunch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterText}>Dinner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterText}>Snacks</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <ScrollView style={styles.recipesContainer}>
                {recipes.map((recipe) => (
                    <TouchableOpacity key={recipe.id} style={styles.recipeCard}>
                        <Image source={recipe.image} style={styles.recipeImage} />
                        <View style={styles.recipeInfo}>
                            <Text style={styles.recipeTitle}>{recipe.title}</Text>
                            <Text style={styles.recipeDuration}>{recipe.duration}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FF',
    },
    searchContainer: {
        padding: 20,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
    },
    filterContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    filterButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 20,
    },
    filterButtonActive: {
        backgroundColor: '#006D77',
    },
    filterText: {
        fontSize: 16,
        color: '#006D77',
    },
    filterTextActive: {
        color: 'white',
    },
    recipesContainer: {
        padding: 20,
    },
    recipeCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        marginBottom: 20,
        overflow: 'hidden',
    },
    recipeImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    recipeInfo: {
        padding: 15,
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recipeDuration: {
        color: '#666',
    },
});

export default FavoriteScreen;