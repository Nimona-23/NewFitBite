
const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({

    nom: { type: String, required: true },
    unité: { type: String, required: false },
    calories: { type: Number, required: false },
})


module.exports = mongoose.model('Ingredient', ingredientsSchema);
