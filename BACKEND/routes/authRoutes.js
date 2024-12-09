const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/utilisateurs');
const router = express.Router();
const { registerUtilisateur, loginUtilisateur } = require('../controllers/authController');



router.post('/signup', registerUtilisateur);
router.post('/login', loginUtilisateur);

module.exports = router;
