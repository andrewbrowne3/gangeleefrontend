import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

const Instructions = () => {
  const [instructions, setInstructions] = useState([]);
  const [text, setText] = useState('');
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  useEffect(() => {
    fetch('https://api.gangelee.com/instructions/')
      .then(response => response.json())
      .then(data => setInstructions(data))
      .catch(error => console.error('Error fetching instructions:', error));
  }, []);

  const handleAddOrUpdateInstruction = () => {
    // handle add or update logic
  };

  const handleDeleteInstruction = (id) => {
    // handle delete logic
  };

  const handleEditInstruction = (instruction) => {
    setSelectedInstruction(instruction);
    setText(instruction.instructions);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'purple', fontWeight: 'bold' }}>
        Instructions
      </Typography>

      <Card variant="outlined" sx={{ backgroundColor: '#e1bee7', padding: '20px', marginBottom: '20px', borderRadius: '10px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Instruction Text"
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              sx={{ backgroundColor: '#ffffff' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#ab47bc', color: '#ffffff' }} onClick={handleAddOrUpdateInstruction}>
              {selectedInstruction ? 'Update Instruction' : 'Add Instruction'}
            </Button>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper} sx={{ backgroundColor: '#f3e5f5', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ab47bc' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Instruction</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructions.map((instruction) => (
              <TableRow key={instruction.id}>
                <TableCell>{instruction.id}</TableCell>
                <TableCell>{instruction.instructions}</TableCell>
                <TableCell>
                  <Button variant="contained" sx={{ backgroundColor: '#f06292', color: '#ffffff' }} onClick={() => handleDeleteInstruction(instruction.id)}>
                    Delete
                  </Button>
                  <Button variant="contained" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }} onClick={() => handleEditInstruction(instruction)}>
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

export default Instructions;
