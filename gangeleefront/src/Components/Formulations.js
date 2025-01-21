import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const Formulations = ({ setView }) => {
  const [formulationGroups, setFormulationGroups] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Fetch formulation groups from the API
  useEffect(() => {
    const fetchFormulationGroups = async () => {
      try {
        const response = await axios.get('https://api.gangelee.com/formulation-groups/');
        setFormulationGroups(response.data);
      } catch (error) {
        console.error('Error fetching formulation groups:', error);
      }
    };

    fetchFormulationGroups();
  }, []);

  // Fetch all products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.gangelee.com/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Add or Update Formulation Group
  const handleAddOrUpdateGroup = async () => {
    if (selectedGroup) {
      // Update group (PUT request)
      try {
        const response = await axios.put(`https://api.gangelee.com/formulation-groups/${selectedGroup.id}/`, {
          name,
          description,
          product: selectedProduct,  // Use the selected product's ID
        });
        const updatedGroups = formulationGroups.map(group =>
          group.id === selectedGroup.id ? response.data : group
        );
        setFormulationGroups(updatedGroups);
        setSelectedGroup(null);
        setName('');
        setDescription('');
        setSelectedProduct('');
      } catch (error) {
        console.error('Error updating group:', error);
      }
    } else {
      // Add new group (POST request)
      try {
        const response = await axios.post('https://api.gangelee.com/formulation-groups/', {
          name,
          description,
          product: selectedProduct,  // Use the selected product's ID
        });
        setFormulationGroups([...formulationGroups, response.data]);
        setName('');
        setDescription('');
        setSelectedProduct('');
      } catch (error) {
        console.error('Error adding group:', error);
      }
    }
  };

  // Delete Formulation Group
  const handleDeleteGroup = async (id) => {
    try {
      await axios.delete(`https://api.gangelee.com/formulation-groups/${id}/`);
      setFormulationGroups(formulationGroups.filter(group => group.id !== id));
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  // Edit Formulation Group (fill form with existing group data)
  const handleEditGroup = (group) => {
    setSelectedGroup(group);
    setName(group.name);
    setDescription(group.description);
    setSelectedProduct(group.product);  // Preselect the product for editing
  };

  // View Formulation Details
  const handleViewFormulationDetails = (group) => {
    setView('individualformulations', group.id);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'purple', fontWeight: 'bold' }}>
        Formulation Groups
      </Typography>

      {/* Add or Update Formulation Group Form */}
      <Card variant="outlined" sx={{ backgroundColor: '#e1bee7', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Group Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                sx={{ backgroundColor: '#ffffff', color: 'black' }}

                label="Product"
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.Name}  {/* Assuming the product has a 'Name' field */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#ab47bc', color: '#ffffff' }}
              onClick={handleAddOrUpdateGroup}
            >
              {selectedGroup ? 'Update Group' : 'Add Group'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Formulation Groups List */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#f3e5f5', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ab47bc' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Group Name</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formulationGroups.map((group) => (
              <TableRow 
                key={group.id} 
                sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#e1bee7' } }}
              >
                <TableCell onClick={() => handleViewFormulationDetails(group)}>{group.name}</TableCell>
                <TableCell>{group.description}</TableCell>
                <TableCell>{group.product}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#9575cd', color: '#ffffff', marginRight: '10px' }}
                    onClick={() => handleEditGroup(group)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#f06292', color: '#ffffff' }}
                    onClick={() => handleDeleteGroup(group.id)}
                  >
                    Delete
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

export default Formulations;
