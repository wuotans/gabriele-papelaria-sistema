import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, Grid, Avatar } from '@mui/material';
import api from '../../services/api';

const InsumoForm = ({ open, handleClose, insumo }) => {
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    quantidadeTotal: 0,
    custoPorUnidade: 0,
    imagem: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (insumo) {
      setFormData({
        nome: insumo.nome,
        categoria: insumo.categoria,
        quantidadeTotal: insumo.quantidadeTotal,
        custoPorUnidade: insumo.custoPorUnidade,
        imagem: insumo.imagem
      });
      if (insumo.imagem) {
        setPreview(`http://localhost:5000/uploads/${insumo.imagem}`);
      }
    } else {
      setFormData({
        nome: '',
        categoria: '',
        quantidadeTotal: 0,
        custoPorUnidade: 0,
        imagem: null
      });
      setPreview(null);
    }
  }, [insumo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagem: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nome', formData.nome);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('quantidadeTotal', formData.quantidadeTotal);
      formDataToSend.append('custoPorUnidade', formData.custoPorUnidade);
      if (formData.imagem instanceof File) {
        formDataToSend.append('imagem', formData.imagem);
      }

      if (insumo) {
        await api.put(`/api/insumos/${insumo._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await api.post('/api/insumos', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      handleClose();
    } catch (error) {
      console.error('Erro ao salvar insumo:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{insumo ? 'Editar Insumo' : 'Adicionar Novo Insumo'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              margin="normal"
              required
            >
              {['Papel', 'Tinta', 'Adesivo', 'Embalagem', 'Decoração', 'Outros'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Quantidade Total"
              name="quantidadeTotal"
              type="number"
              value={formData.quantidadeTotal}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Custo por Unidade (R$)"
              name="custoPorUnidade"
              type="number"
              step="0.01"
              value={formData.custoPorUnidade}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {preview ? (
              <Avatar
                src={preview}
                alt="Preview"
                sx={{ width: 150, height: 150, mb: 2 }}
                variant="rounded"
              />
            ) : (
              <Avatar
                sx={{ width: 150, height: 150, mb: 2, bgcolor: 'primary.main' }}
                variant="rounded"
              >
                Sem Imagem
              </Avatar>
            )}
            <Button variant="contained" component="label">
              Upload de Imagem
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InsumoForm;