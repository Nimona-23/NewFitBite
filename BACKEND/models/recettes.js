const mongoose = require('mongoose');

const validCategories = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'First trimester',
    'Second trimester',
    'Third trimester'
];

const generalCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const trimesterCategories = ['First trimester', 'Second trimester', 'Third trimester'];

const recettesSchema = new mongoose.Schema({
    categorie: {
        type: [String], // Array of strings
        required: true,
        validate: [
            {
                validator: function (categories) {
                    // Ensure all categories are valid
                    return categories.every(cat => validCategories.includes(cat));
                },
                message: props => `${props.value} contains an invalid category. Allowed categories are: ${validCategories.join(', ')}.`
            },
            {
                validator: function (categories) {
                    // Ensure at least one trimester category is included
                    return categories.some(cat => trimesterCategories.includes(cat));
                },
                message: 'At least one category must be "First trimester", "Second trimester", or "Third trimester".'
            },
            {
                validator: function (categories) {
                    // Ensure at least one general category is included
                    return categories.some(cat => generalCategories.includes(cat));
                },
                message: 'At least one category must be "Breakfast", "Lunch", "Dinner", or "Snack".'
            }
        ]
    },
    image: { type: String, required: false },
    nom: { type: String, required: true },
    description: { type: String },
    tempsPreparation: { type: Number, required: true },
    calories: { type: Number },
    ingredients: [
        {
            ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
            quantite: { type: Number, required: false },
        },
    ],
    instructions: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Recette', recettesSchema);
