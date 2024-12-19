const mongoose = require('mongoose');

const trimesterCategories = [1, 2, 3];


const formulaireDynamiqueSchema = new mongoose.Schema({

  trimester: {
    type: [Number], // Array of strings
    required: true,
    validate: [
      {
        validator: function (categories) {
          // Ensure all categories are valid
          return categories.every(cat => trimesterCategories.includes(cat));
        },
        message: props => `${props.value} contains an invalid category. Allowed categories are: ${trimesterCategories.join(', ')}.`
      }
    ]
  }, poidsActuel: Number,
  taille: Number,
  recommandations: String,
  ActivitePhysique: String,

  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilisateur'
  }
});

module.exports = mongoose.model('FormulaireDynamique', formulaireDynamiqueSchema);
