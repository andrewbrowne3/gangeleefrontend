import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import axios from 'axios';

const RawMaterials = () => {
  const [rawMaterials, setRawMaterials] = useState([]);
  const [name, setName] = useState('');
  const [purpose, setPurpose] = useState('');  // Replacing category with purpose
  const [quantity, setQuantity] = useState('');
  const [selectedRawMaterial, setSelectedRawMaterial] = useState(null);

  // Fetch raw materials from the API when the component mounts
  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await axios.get('https://api.gangelee.com/raw-materials/');
        setRawMaterials(response.data);  // Set the data from the API response
      } catch (error) {
        console.error('Error fetching raw materials:', error);
      }
    };

    fetchRawMaterials();
  }, []);  // Empty dependency array ensures it only runs once when the component mounts

  // Add or update raw material
  const handleAddOrUpdateRawMaterial = async () => {
    if (selectedRawMaterial) {
      // Update raw material (PUT request)
      try {
        const response = await axios.put(`https://api.gangelee.com/raw-materials/${selectedRawMaterial.id}/`, {
          Name: name,
          Purpose: purpose,
          Quantity: quantity,
        });
        const updatedRawMaterials = rawMaterials.map(rawMaterial =>
          rawMaterial.id === selectedRawMaterial.id ? response.data : rawMaterial
        );
        setRawMaterials(updatedRawMaterials);
        setSelectedRawMaterial(null);
        setName('');
        setPurpose('');
        setQuantity('');
      } catch (error) {
        console.error('Error updating raw material:', error);
      }
    } else {
      // Add new raw material (POST request)
      try {
        const response = await axios.post('https://api.gangelee.com/raw-materials/', {
          Name: name,
          Purpose: purpose,
          Quantity: quantity,
        });
        setRawMaterials([...rawMaterials, response.data]);
        setName('');
        setPurpose('');
        setQuantity('');
      } catch (error) {
        console.error('Error adding raw material:', error);
      }
    }
  };

  // Delete raw material
  const handleDeleteRawMaterial = async (id) => {
    try {
      await axios.delete(`https://api.gangelee.com/raw-materials/${id}/`);
      setRawMaterials(rawMaterials.filter(rawMaterial => rawMaterial.id !== id));
    } catch (error) {
      console.error('Error deleting raw material:', error);
    }
  };

  // Edit raw material (fill the form with existing raw material data)
  const handleEditRawMaterial = (rawMaterial) => {
    setSelectedRawMaterial(rawMaterial);
    setName(rawMaterial.Name || rawMaterial.name);
    setPurpose(rawMaterial.Purpose || rawMaterial.purpose);  // Adjusted to use purpose
    setQuantity(rawMaterial.Quantity || rawMaterial.quantity);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'purple', fontWeight: 'bold' }}>
        Raw Materials
      </Typography>

      {/* Add or Update Raw Material Form */}
      <Card variant="outlined" sx={{ backgroundColor: '#e1bee7', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Purpose"  // Adjusted label to Purpose
              variant="outlined"
              fullWidth
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ab47bc', color: '#ffffff' }}
              onClick={handleAddOrUpdateRawMaterial}
            >
              {selectedRawMaterial ? 'Update Raw Material' : 'Add Raw Material'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Raw Materials List Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#f3e5f5', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ab47bc' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Purpose</TableCell>  {/* Adjusted from category to purpose */}
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rawMaterials.map((rawMaterial) => (
              <TableRow key={rawMaterial.id} sx={{ '&:hover': { backgroundColor: '#e1bee7' } }}>
                <TableCell>{rawMaterial.id}</TableCell>
                <TableCell>{rawMaterial.Name || rawMaterial.name}</TableCell>  {/* Handle both API and local state fields */}
                <TableCell>{rawMaterial.Purpose || rawMaterial.purpose}</TableCell>  {/* Display purpose */}
                <TableCell>{rawMaterial.Quantity || rawMaterial.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#f06292', color: '#ffffff' }}
                    onClick={() => handleDeleteRawMaterial(rawMaterial.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#9575cd', color: '#ffffff' }}
                    onClick={() => handleEditRawMaterial(rawMaterial)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RawMaterials;
