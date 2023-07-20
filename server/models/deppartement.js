const mongoose = require("mongoose");

const deppartementSchema = new mongoose.Schema({
  nom: {
    type: String,
  },
  services: {
    type: Array,
    default: [],
  },
  id_manager: {
    type: String,
  },
});

const Deppartement = mongoose.model("Deppartement", deppartementSchema);

module.exports = Deppartement;
