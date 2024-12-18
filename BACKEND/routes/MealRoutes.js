const express = require("express");
const Meal = require("../models/Meal");

const router = express.Router();

// Add a meal
router.post("/meals", async (req, res) => {
    try {
        const { mealType, date, item } = req.body; // Item includes { itemId, name, calories }

        let meal = await Meal.findOne({ mealType, date });

        if (!meal) {
            // Create a new meal if it doesn't exist
            meal = new Meal({ mealType, date, items: [], totalCalories: 0 });
        }

        // Add the item to the items list
        meal.items.push(item);
        meal.totalCalories += item.calories;

        await meal.save();

        res.status(201).json({ message: "Item added to meal successfully", meal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add item to meal" });
    }
});


// Remove a meal
router.delete("/meals", async (req, res) => {
    try {
        const { mealType, date, itemId } = req.body;

        const meal = await Meal.findOne({ mealType, date });

        if (!meal) {
            return res.status(404).json({ error: "Meal not found" });
        }

        // Find the item and remove it
        const item = meal.items.find((i) => i.itemId.toString() === itemId);
        if (item) {
            meal.totalCalories -= item.calories;
            meal.items = meal.items.filter((i) => i.itemId.toString() !== itemId);
        }

        await meal.save();

        res.status(200).json({ message: "Item removed successfully", meal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove item from meal" });
    }
});



module.exports = router;
