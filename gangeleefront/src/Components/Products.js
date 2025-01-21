import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch all products from the API on component mount
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

  // Add or update product
  const handleAddOrUpdateProduct = async () => {
    if (selectedProduct) {
      // Update product (PUT request)
      try {
        const response = await axios.put(`https://api.gangelee.com/products/${selectedProduct.id}/`, {
          Name: name,
          Type: category
        });
        const updatedProducts = products.map(product =>
          product.id === selectedProduct.id ? response.data : product
        );
        setProducts(updatedProducts);
        setSelectedProduct(null);
        setName('');
        setCategory('');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      // Add new product (POST request)
      try {
        const response = await axios.post('https://api.gangelee.com/products/', {
          Name: name,
          Type: category
        });
        setProducts([...products, response.data]);  // Add the new product to the list
        setName('');  // Clear the input fields
        setCategory('');
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  // Delete product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`https://api.gangelee.com/products/${id}/`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Edit product (fill the form with existing product data)
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setName(product.Name);  // Fill the form with the product's current name
    setCategory(product.Type);  // Fill the form with the product's current category/type
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'purple', fontWeight: 'bold' }}>
        Product List
      </Typography>

      {/* Add or Update Product Form */}
      <Card variant="outlined" sx={{ backgroundColor: '#e1bee7', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#ab47bc', color: '#ffffff' }} onClick={handleAddOrUpdateProduct}>
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Product List Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: '#f3e5f5', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ab47bc' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.Name}</TableCell>
                <TableCell>{product.Type}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: '#f06292', color: '#ffffff' }} onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }} onClick={() => handleEditProduct(product)}>
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

export default Products;
