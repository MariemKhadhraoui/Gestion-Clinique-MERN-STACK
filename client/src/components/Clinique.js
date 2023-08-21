import React, { useState } from 'react';
import axios from 'axios';

const Clinique = () => {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    code_postale: '',
    pays: '',
    email: '',
    ville: '',
    numtelephone: '',
    description: '',
    id_directeur: '',
    image: null, // Utilisez null pour représenter l'absence d'image au départ
    latitude: '',
    longitude: '',
    dateOuverture: '',
    horairesOuvertureL: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Mettez à jour l'image avec le fichier sélectionné
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();

    // Transférez toutes les valeurs du formulaire dans formDataToSend
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
   
    
    try {
      const response = await axios.post('http://localhost:5000/api/clinique/add', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);

      // Réinitialisez le formulaire après un ajout réussi
      setFormData({
        nom: '',
        adresse: '',
        code_postale: '',
        pays: '',
        email: '',
        ville: '',
        numtelephone: '',
        description: '',
        id_directeur: '',
        image: null,
        latitude: '',
        longitude: '',
        dateOuverture: '',
        horairesOuvertureL: '',
      });
    } catch (error) {
      console.error(error);
      setError(error.response.data.error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Ajouter une clinique</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100%' }}>
        {/* Champ "Nom" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Nom :</label>
          <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Adresse" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Adresse :</label>
          <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Code Postal" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Code Postal :</label>
          <input type="text" name="code_postale" value={formData.code_postale} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Pays" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Pays :</label>
          <input type="text" name="pays" value={formData.pays} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Email" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Email :</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Ville" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Ville :</label>
          <input type="text" name="ville" value={formData.ville} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Numéro de Téléphone" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Numéro de Téléphone :</label>
          <input type="tel" name="numtelephone" value={formData.numtelephone} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Description" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Description :</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "ID Directeur" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>ID Directeur :</label>
          <input type="text" name="id_directeur" value={formData.id_directeur} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Image" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Image :</label>
          <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
        </div>
        {/* Champ "Latitude" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Latitude :</label>
          <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Longitude" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Longitude :</label>
          <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Date d'Ouverture" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Date d'Ouverture :</label>
          <input type="date" name="dateOuverture" value={formData.dateOuverture} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Horaires d'Ouverture" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Horaires d'Ouverture :</label>
          <input type="time" name="horairesOuvertureL" value={formData.horairesOuvertureL} onChange={handleInputChange} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Bouton de soumission */}
        <button
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
          }}
          type="submit"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default Clinique;
