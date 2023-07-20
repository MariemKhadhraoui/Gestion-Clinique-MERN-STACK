const Clinique = require('../models/clinique'); 

// Cree
exports.createClinique = async (req, res) => {
  try {
    const { nom, adresse, code_postale, id_directeur } = req.body;
    const existingClinique = await Clinique.findOne({ nom });
    if (existingClinique) {
      return res.status(400).json({ error: 'Un clinique avec ce nom existe déjà. Le nom doit être unique.' });
    }
    const clinique = new Clinique({ nom, adresse, code_postale, id_directeur });
    await clinique.save();
    res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
  }
};

// Modification d'une clinique
exports.updateClinique = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, code_postale, id_directeur } = req.body;
    const clinique = await Clinique.findByIdAndUpdate(id, { nom, adresse, code_postale, id_directeur }, { new: true });
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }
    res.json({ message: 'Clinique modifiée avec succès', clinique });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la clinique' });
  }
};

// Affichage d'une clinique
exports.getClinique = async (req, res) => {
  try {
    const { id } = req.params;
    const clinique = await Clinique.findById(id);
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }
    res.json(clinique);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération de la clinique' });
  }
};

// Affichage de la liste des cliniques
exports.getAllCliniques = async (req, res) => {
  try {
    const cliniques = await Clinique.find();
    res.json(cliniques);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des cliniques' });
  }
};

// Suppression d'une clinique
exports.deleteClinique = async (req, res) => {
  try {
    const { id } = req.params;
    const clinique = await Clinique.findByIdAndDelete(id);
    if (!clinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }
    res.json({ message: 'Clinique supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la suppression de la clinique' });
  }
};

// Recherche d'une clinique par nom
exports.searchClinique = async (req, res) => {
  try {
    const { nom } = req.query;
    const regex = new RegExp(nom, 'i');
    const cliniques = await Clinique.find({ nom: regex });

    if (cliniques.length === 0) {
      return res.status(404).json({ error: 'Aucune clinique trouvée' });
    }

    res.json(cliniques);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des cliniques' });
  }
};