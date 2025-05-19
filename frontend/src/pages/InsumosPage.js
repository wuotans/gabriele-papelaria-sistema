import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InsumoForm from '../components/insumos/InsumoForm';
import api from '../services/api';

const InsumosPage = () => {
  const [insumos, setInsumos] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editingInsumo, setEditingInsumo] = useState(null);

  useEffect(() => {
    fetchInsumos();
  }, []);

  const fetchInsumos = async () => {
    try {
      const response = await api.get('/api/insumos');
      setInsumos(response.data);
    } catch (error) {
      console.error('Erro ao buscar insumos:', error);
    }
  };

  const handleOpenForm = (insumo = null) => {
    setEditingInsumo(insumo);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditingInsumo(null);
    fetchInsumos();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/insumos/${id}`);
      fetchInsumos();
    } catch (error) {
      console.error('Erro ao deletar insumo:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Gerenciamento de Insumos
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenForm()}
              sx={{ mb: 3 }}
            >
              Adicionar Insumo
            </Button>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Imagem</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Custo/Unidade</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {insumos.map((insumo) => (
                    <TableRow key={insumo._id}>
                      <TableCell>
                        {insumo.imagem && (
                          <img 
                            src={`http://localhost:5000/uploads/${insumo.imagem}`} 
                            alt={insumo.nome} 
                            style={{ width: 50, height: 50, objectFit: 'cover' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{insumo.nome}</TableCell>
                      <TableCell>{insumo.categoria}</TableCell>
                      <TableCell>{insumo.quantidadeTotal}</TableCell>
                      <TableCell>R$ {insumo.custoPorUnidade.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenForm(insumo)}>Editar</Button>
                        <Button color="error" onClick={() => handleDelete(insumo._id)}>Excluir</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      
      <InsumoForm 
        open={openForm} 
        handleClose={handleCloseForm} 
        insumo={editingInsumo} 
      />
    </Container>
  );
};

export default InsumosPage;