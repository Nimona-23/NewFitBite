const Recette = require("../models/recettes");
const User = require("../models/User");
const {
  generalCategories,
  trimesterCategories,
} = require("../models/recettes");

// Créer une nouvelle recette
exports.creerRecette = async (req, res) => {
  try {
    const recette = new Recette(req.body);
    await recette.save();
    res.status(201).send(recette);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Récupérer toutes les recettes
exports.getRecettes = async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.status(200).json(recettes);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la récupération des recettes" });
  }
};

// Récupérer une recette par ID
exports.getRecetteParId = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id).populate(
      "ingredients.ingredient"
    );
    if (!recette) {
      return res.status(404).send({ message: "Recette non trouvée" });
    }
    res.status(200).send(recette);
  } catch (error) {
    res.status(404).send({ message: "Recette non trouvée" });
  }
};

// Supprimer une recette par ID
exports.supprimerRecette = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndDelete(req.params.id);
    if (!recette) {
      return res.status(404).send({ message: "Recette non trouvée" });
    }
    res.status(200).send({ message: "Recette supprimée avec succès" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la suppression de la recette" });
  }
};

// Mettre à jour une recette par ID
exports.mettreAJourRecette = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retourne la recette mise à jour
      runValidators: true, // Valide les données avant la mise à jour
    });

    if (!recette) {
      return res.status(404).send({ message: "Recette non trouvée" });
    }

    res.status(200).send(recette);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Erreur lors de la mise à jour de la recette", error });
  }
};

// Récupérer des recettes par catégorie et trimestre
exports.getRecettesParCategorieEtTrimestre = async (req, res) => {
  const { categorie, trimestre } = req.query;

  try {
    // Validation des entrées
    if (!generalCategories.includes(categorie)) {
      return res.status(400).send({
        message: `La catégorie '${categorie}' est invalide. Catégories autorisées : ${generalCategories.join(
          ", "
        )}.`,
      });
    }

    if (!trimesterCategories.includes(Number(trimestre))) {
      return res.status(400).send({
        message: `Le trimestre '${trimestre}' est invalide. Trimestres autorisés : ${trimesterCategories.join(
          ", "
        )}.`,
      });
    }

    // Requête pour récupérer les recettes
    const recettes = await Recette.find({
      categorie: { $in: [categorie] },
      trimester: { $in: [Number(trimestre)] },
    });

    res.status(200).send(recettes);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la récupération des recettes", error });
  }
};
