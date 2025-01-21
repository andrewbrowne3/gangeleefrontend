import React, { useState, useEffect } from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';

const IndividualFormulation = ({ groupId }) => {
  const [formulations, setFormulations] = useState([]);

  useEffect(() => {
    if (groupId) {
      fetch(`https://api.gangelee.com/formulation-groups/${groupId}/`)
        .then(response => response.json())
        .then(data => setFormulations(data.formulations))
        .catch(error => console.error('Error fetching formulations:', error));
    }
  }, [groupId]);

  if (!formulations || formulations.length === 0) {
    return <Typography>No formulations found</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom align="center" sx={{ color: 'purple', fontWeight: 'bold' }}>
        Formulation Details
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#f3e5f5', borderRadius: '10px' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#ab47bc' }}>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Line Type</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Quantity</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Unit Cost</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Row Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formulations.map((formulation) => (
              <TableRow key={formulation.id}>
                <TableCell>{formulation.Line_type}</TableCell>
                <TableCell>{formulation.description}</TableCell>
                <TableCell>{formulation.Quantity}</TableCell>
                <TableCell>{formulation.unitCost}</TableCell>
                <TableCell>{formulation.rowCost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default IndividualFormulation;
