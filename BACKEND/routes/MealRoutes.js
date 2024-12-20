const express = require('express');
const router = express.Router();
const MealController = require('../controllers/MealController');

// Create a new meal
router.post('/meals', MealController.createMeal);

// Get all meals for a user
router.get('/meals/user/:userId', MealController.getMealsByUser);

// Get a single meal
router.get('/meals/:id', MealController.getMealById);

// Update meal items
router.patch('/meals/:id/items', MealController.updateMealItems);

// Delete a meal
router.delete('/meals/:id', MealController.deleteMeal);

module.exports = router;