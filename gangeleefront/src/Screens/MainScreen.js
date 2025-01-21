import React, { useState } from 'react';
import Products from '../Components/Products';
import Formulations from '../Components/Formulations';
import RawMaterials from '../Components/RawMaterials';
import Instructions from '../Components/Instructions';
import IndividualFormulation from '../Components/IndividualFormulations';
import { Button, Grid } from '@mui/material';

const MainScreen = () => {
  const [view, setView] = useState('products');
  const [selectedGroupId, setSelectedGroupId] = useState(null);  // State to hold selected group ID

  // Handle switching view and setting selected group ID
  const handleViewChange = (newView, groupId = null) => {
    setView(newView);
    setSelectedGroupId(groupId);  // Set the selected group ID
  };

  return (
    <div>
      {/* Dynamic component rendering */}
      <div>
        {view === 'products' && <Products />}
        {view === 'formulations' && <Formulations setView={handleViewChange} />}  {/* Pass setView */}
        {view === 'raw-materials' && <RawMaterials />}
        {view === 'instructions' && <Instructions />}
        {view === 'individualformulations' && <IndividualFormulation groupId={selectedGroupId} />}  {/* Pass selected groupId */}
      </div>

      {/* Navigation buttons */}
      <Grid container spacing={2} sx={{ justifyContent: 'center', marginTop: '20px' }}>
        <Grid item>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }}onClick={() => setView('products')}>
            Show Products
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }} onClick={() => setView('formulations')}>
            Show Formulations
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }}onClick={() => setView('raw-materials')}>
            Show Raw Materials
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" sx={{ backgroundColor: '#9575cd', color: '#ffffff' }}onClick={() => setView('instructions')}>
            Show Instructions
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainScreen;
