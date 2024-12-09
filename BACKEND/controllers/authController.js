const Utilisateur = require('../models/Utilisateur');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Inscription
exports.registerUtilisateur = async (req, res) => {
  const { nom, prenom, email, motDePasse, age, poids, hauteur, sexe } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse,
      age,
      poids,
      hauteur,
      sexe,
    });

    await nouvelUtilisateur.save();

    res.status(201).json({
      _id: nouvelUtilisateur.id,
      nom: nouvelUtilisateur.nom,
      prenom: nouvelUtilisateur.prenom,
      email: nouvelUtilisateur.email,
      token: generateToken(nouvelUtilisateur.id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// Connexion
exports.loginUtilisateur = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    const utilisateur = await Utilisateur.findOne({ email });

    if (utilisateur && (await utilisateur.matchPassword(motDePasse))) {
      res.status(200).json({
        _id: utilisateur.id,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        token: generateToken(utilisateur.id),
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
