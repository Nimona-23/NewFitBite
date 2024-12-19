const express = require('express');
const {
    ajouterIngredient,
    getIngredients,
    supprimerIngredient,
} = require('../controllers/ingredientsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', ajouterIngredient);
router.get('/', getIngredients);
router.delete('/:id', supprimerIngredient);
/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - id
 *         - nom
 *         - quantiteStock
 *         - unité
 *       properties:
 *         id:
 *           type: string
 *           description: L'identifiant unique de l'ingrédient
 *         nom:
 *           type: string
 *           description: Le nom de l'ingrédient
 *         calories:
 *           type: number
 *           description: La quantité en stock
 *         unité:
 *           type: string
 *           description:  "L'unité de mesure (exemple : kg, litre)"
 *       example:
 *         id: "12345"
 *         nom: "Tomate"
 *         calories: 10
 *         unité: "kg"
 */

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Ajouter un ingrédient
 *     tags: [Ingrédients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingrédient ajouté avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Récupérer tous les ingrédients
 *     tags: [Ingrédients]
 *     responses:
 *       200:
 *         description: Liste des ingrédients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Supprimer un ingrédient
 *     tags: [Ingrédients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'identifiant de l'ingrédient à supprimer
 *     responses:
 *       200:
 *         description: Ingrédient supprimé avec succès
 *       404:
 *         description: Ingrédient non trouvé
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
