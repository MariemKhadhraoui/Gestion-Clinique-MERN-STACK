import React, { useState } from 'react';
import axios from 'axios';

const Clinique = () => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [code_postale, setCodePostale] = useState('');
  const [id_directeur, setIdDirecteur] = useState('');
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
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
    formData.append('id_directeur', id_directeur);
    formData.append('image', image);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

    try {
      const response = await axios.post('http://localhost:5000/api/clinique/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '10px' }}>Ajouter une clinique</h2>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100%' }}>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Nom :</label>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Adresse :</label>
          <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Code Postal :</label>
          <input type="text" value={code_postale} onChange={(e) => setCodePostale(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>ID Directeur :</label>
          <input type="text" value={id_directeur} onChange={(e) => setIdDirecteur(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Image :</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Latitude :</label>
          <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <label style={{ fontWeight: 'bold', marginRight: '10px', width: '100px' }}>Longitude :</label>
          <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} style={{ flex: 1, padding: '5px' }} required />
        </div>
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
