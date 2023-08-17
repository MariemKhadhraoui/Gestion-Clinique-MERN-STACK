import React, { useState } from 'react';
import axios from 'axios';

const Clinique = () => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [code_postale, setCodePostale] = useState('');
  const [pays, setPays] = useState('');
  const [email, setEmail] = useState('');
  const [ville, setVille] = useState('');
  const [numtelephone, setNumTelephone] = useState('');
  const [description, setDescription] = useState('');
  const [id_directeur, setIdDirecteur] = useState('');
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [dateOuverture, setDateOuverture] = useState('');
  const [horairesOuvertureL, setHorairesOuvertureL] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('adresse', adresse);
    formData.append('code_postale', code_postale);
    formData.append('pays', pays);
    formData.append('email', email);
    formData.append('ville', ville);
    formData.append('numtelephone', numtelephone);
    formData.append('description', description);
    formData.append('id_directeur', id_directeur);
    formData.append('image', image);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('dateOuverture', dateOuverture);
    formData.append('horairesOuvertureL', horairesOuvertureL);

    try {
      const response = await axios.post('http://localhost:5000/api/clinique/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
    } catch (error) {
      console.log(error.response.data.error);
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
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Adresse" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Adresse :</label>
          <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Code Postal" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Code Postal :</label>
          <input type="text" value={code_postale} onChange={(e) => setCodePostale(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Pays" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Pays :</label>
          <input type="text" value={pays} onChange={(e) => setPays(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Email" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Ville" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Ville :</label>
          <input type="text" value={ville} onChange={(e) => setVille(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Numéro de Téléphone" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Numéro de Téléphone :</label>
          <input type="tel" value={numtelephone} onChange={(e) => setNumTelephone(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Description" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Description :</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "ID Directeur" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>ID Directeur :</label>
          <input type="text" value={id_directeur} onChange={(e) => setIdDirecteur(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Image" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Image :</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
        </div>
        {/* Champ "Latitude" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Latitude :</label>
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Longitude" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Longitude :</label>
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Date d'Ouverture" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Date d'Ouverture :</label>
          <input type="date" value={dateOuverture} onChange={(e) => setDateOuverture(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        {/* Champ "Horaires d'Ouverture" */}
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Horaires d'Ouverture :</label>
          <input type="time" value={horairesOuvertureL} onChange={(e) => setHorairesOuvertureL(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
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
