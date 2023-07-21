const Clinique = require('../models/clinique'); 
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');


//------------------------ Cloudinary Infos -----------------------------------------------//
// Configuration de Cloudinary
cloudinary.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
});

// Configuration de multer pour spécifier où enregistrer les fichiers en utilisant CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cliniqueImages', //  dossier dans lequel les images seront stockées sur Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'] //  les formats de fichier autorisés
  }
});

// multer avec le stockage CloudinaryStorage
const upload = multer({ storage });

exports.createClinique = upload.single('image'), async (req, res) => {
  try {
    const { nom, adresse, code_postale, id_directeur, latitude, longitude } = req.body;
    // tester si une clinique existe déjà
    const existingClinique = await Clinique.findOne({ nom });
    if (existingClinique) {
      return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const clinique = new Clinique({ 
      nom, 
      adresse, 
      image: result.secure_url, 
      code_postale, 
      id_directeur,
      localisation: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    });

    await clinique.save();
    res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
  }
};




// Ajouter une clinique
// exports.createClinique = async (req, res) => {
//   try {
//     const { nom, adresse, code_postale, id_directeur } = req.body;
//     const existingClinique = await Clinique.findOne({ nom });
//     if (existingClinique) {
//       return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
//     }
//     const clinique = new Clinique({ nom, adresse, code_postale, id_directeur });
//     await clinique.save();
//     res.status(201).json({ message: 'Clinique enregistrée avec succès', clinique });
//   } catch (error) {
//     res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la clinique' });
//   }
// };



// // Modification d'une clinique
// exports.updateClinique = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nom, adresse, code_postale, id_directeur } = req.body;
//     const clinique = await Clinique.findByIdAndUpdate(id, { nom, adresse, code_postale, id_directeur }, { new: true });
//     if (!clinique) {
//       return res.status(404).json({ error: 'Clinique non trouvée' });
//     }
//     res.json({ message: 'Clinique modifiée avec succès', clinique });
//   } catch (error) {
//     res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la clinique' });
//   }
// };
exports.updateClinique = upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, adresse, code_postale, id_directeur, latitude, longitude } = req.body;

    // Vérifier si la clinique existe avant de la mettre à jour
    const existingClinique = await Clinique.findById(id);
    if (!existingClinique) {
      return res.status(404).json({ error: 'Clinique non trouvée' });
    }

    // Vérifier si le nom de la clinique est modifié et qu'il n'existe pas déjà
    if (nom && nom !== existingClinique.nom) {
      const duplicateClinique = await Clinique.findOne({ nom });
      if (duplicateClinique) {
        return res.status(400).json({ error: 'Une clinique avec ce nom existe déjà. Le nom doit être unique.' });
      }
    }

    // Vérifiez si une nouvelle image a été téléchargée
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      existingClinique.image.url = result.secure_url; // Mettre à jour l'URL sécurisée de l'image sur Cloudinary
      existingClinique.image.public_id = result.public_id; // Mettre à jour l'identifiant public de l'image sur Cloudinary
    }

    existingClinique.nom = nom;
    existingClinique.adresse = adresse;
    existingClinique.code_postale = code_postale;
    existingClinique.id_directeur = id_directeur;
    existingClinique.localisation.latitude = parseFloat(latitude);
    existingClinique.localisation.longitude = parseFloat(longitude);

    await existingClinique.save();
    res.json({ message: 'Clinique modifiée avec succès', clinique: existingClinique });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la modification de la clinique' });
  }
};



// Affichage d'une clinique par id 
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

    // if (cliniques.length === 0) {
    //   return res.status(404).json({ error: 'Aucune clinique trouvée' });
    // }

    res.json(cliniques);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des cliniques' });
  }
};