const mongoose = require('mongoose');
const User = require('../models/User');


const cliniqueSchema = new mongoose.Schema({
  nom: { 
       type: String,
    },
  adresse: { 
    type: String,
    
     },
     image: {
      type: String,        
     
    },
  code_postale: { 
    type: Number, 
       },
  id_directeur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
   localisation: {
      latitude: { type: Number },
      longitude: { type: Number },
    } 
         
});


const Clinique = mongoose.model('Clinique', cliniqueSchema);

module.exports = Clinique;
