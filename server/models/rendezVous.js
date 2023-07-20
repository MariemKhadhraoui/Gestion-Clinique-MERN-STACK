const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
  date: {
    type: String,
  },
  id_patient: {
    type: String,
  },
  id_service: {
    type: String,
  },
  description: {
    type: String,
  },
  statut: {
    type: String,
    enum: ["attente", "accepté", "refusé"], // Les valeurs possibles pour le statut 
  },
});

const RendezVous = mongoose.model("RendezVous", rendezVousSchema);

module.exports = RendezVous;
