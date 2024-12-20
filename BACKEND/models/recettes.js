const mongoose = require("mongoose");

const generalCategories = ["Breakfast", "Lunch", "Dinner", "Snack"];
const trimesterCategories = [1, 2, 3];

const recettesSchema = new mongoose.Schema(
  {
    categorie: {
      type: [String], // Tableau de chaînes
      required: true,
      validate: [
        {
          validator: function (categories) {
            return categories.every((cat) =>
              generalCategories
                .map((c) => c.toLowerCase())
                .includes(cat.trim().toLowerCase())
            );
          },
          message: (props) =>
            `${
              props.value
            } contient une catégorie invalide. Les catégories autorisées sont : ${generalCategories.join(
              ", "
            )}.`,
        },
      ],
    },
    trimester: {
      type: [Number], // Tableau de nombres
      required: true,
      validate: [
        {
          validator: function (categories) {
            return categories.every((cat) => trimesterCategories.includes(cat));
          },
          message: (props) =>
            `${
              props.value
            } contient une catégorie invalide. Les catégories autorisées sont : ${trimesterCategories.join(
              ", "
            )}.`,
        },
      ],
    },
    image: { type: String, required: false },
    nom: { type: String, required: true },
    description: { type: String },
    tempsPreparation: { type: Number, required: true },
    calories: { type: Number },
    ingredients: [
      {
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
        quantite: { type: Number, required: false },
        unite: { type: String, required: false },
        calorie: { type: Number, required: false },
      },
    ],
    instructions: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recette", recettesSchema);
