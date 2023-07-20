const express = require('express');
const router = express.Router();
const cliniqueController = require('../controllers/cliniqueController'); // Remplacez le chemin correctement

// Enregistrement d'une clinique
router.post('/add', cliniqueController.createClinique);

// Modification d'une clinique
router.put('/put/:id', cliniqueController.updateClinique);

// Affichage d'une clinique
router.get('/get/:id', cliniqueController.getClinique);

// Affichage de la liste des cliniques
router.get('/get', cliniqueController.getAllCliniques);

// Suppression d'une clinique
router.delete('/delete/:id', cliniqueController.deleteClinique);

// Recherche d'une clinique par nom
router.get('/search', cliniqueController.searchClinique);

module.exports = router;
