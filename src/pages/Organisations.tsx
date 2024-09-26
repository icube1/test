import React, { Suspense, useContext, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Snackbar } from '@mui/material';
import { DatePicker } from '@mui/lab';
import { observer } from 'mobx-react-lite';
import { createStore, RootStore } from '../models/OrgsModel';
import { useStore } from '../stores/StoreProvider';
import useOrgApi from '../api/useOrganisationsApi';

const Organisations = observer(() => {
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgActiveUntil, setNewOrgActiveUntil] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const orgStore = useStore();

  const {loading, error} = useOrgApi();
// orgStore.addOrg(org)

  const handleSaveNewOrg = () => {
    // Logic to save new organization using API
    // Display Snackbar on success or error
  };

  const handleDeleteOrg = (orgId :string | number) => {
    // Logic to delete organization using API
    // Display Snackbar on success or error
  };

  return (
    <div style={{padding: 16}}>
      <div>
        <TextField
          label="Название организации"
          value={newOrgName}
          onChange={(e) => setNewOrgName(e.target.value)}
        />
        <DatePicker
          label="Активна до"
          value={newOrgActiveUntil}
          onChange={(newValue: any) => setNewOrgActiveUntil(newValue)}
          renderInput={(params: any) => <TextField {...params} />}
        />
        <Button variant="contained" onClick={handleSaveNewOrg}>Сохранить</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Активна до</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {orgStore.orgs.map((org: any) => (
              <TableRow key={org.id}>
                <TableCell>{org.id}</TableCell>
                <TableCell>{org.name}</TableCell>
                <TableCell>{org.activeUntil}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteOrg(org.id)}>Удалить</Button>
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
});

export default Organisations;