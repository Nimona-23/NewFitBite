// const authRoutes = require('./routes/authRoutes');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const express = require('express');
// const dotenv = require('dotenv');
// const colors = require('colors');
// const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
// // Importation des routes
// const utilisateurRoutes = require('./routes/utilisateursRoutes');
// const listeCoursesRoutes = require('./routes/listeCoursesRoutes');
// const favorisRoutes = require('./routes/favorisRoutes');
// const formulaireRoutes = require('./routes/formulaireDynamiqueRoutes');
// const recetteRoutes = require('./routes/recettesRoutes');  // Route de recettes
// const ingredientRoutes = require('./routes/ingredientsRoutes');
// const supermarchesRoutes = require('./routes/supermarchesRoutes');
// // Charger les variables d'environnement
// dotenv.config();

// // Connexion à MongoDB
// connectDB();

// // Initialiser l'application Express
// const app = express();

// // Middleware pour parser le JSON
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connecté à MongoDB'))
//   .catch((err) => console.log('Erreur de connexion à MongoDB:', err));

// // Définition des routes
// app.use('/api/utilisateurs', utilisateurRoutes);
// app.use('/api/listes-courses', listeCoursesRoutes);
// app.use('/api/favoris', favorisRoutes);
// app.use('/api/formulaires', formulaireRoutes);
// app.use('/api/recettes', recetteRoutes);  // Lien vers les routes des recettes
// app.use('/api/ingredients', ingredientRoutes);
// app.use('/api/supermarches', supermarchesRoutes);

// // Gestion des erreurs 404
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Ressource non trouvée' });
// });

// // Démarrage du serveur
// const port = process.env.PORT || 5000;
// app.listen(port, () => console.log(`Serveur démarré sur le port ${port}`));
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
