const Insumo = require('../models/Insumo');
const fs = require('fs');
const path = require('path');

exports.createInsumo = async (req, res) => {
  try {
    const { nome, categoria, quantidadeTotal, custoPorUnidade } = req.body;
    let imagem = null;
    
    if (req.file) {
      imagem = req.file.filename;
    }
    
    const insumo = new Insumo({
      nome,
      categoria,
      quantidadeTotal,
      custoPorUnidade,
      imagem
    });
    
    await insumo.save();
    res.status(201).json(insumo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllInsumos = async (req, res) => {
  try {
    const insumos = await Insumo.find().sort({ createdAt: -1 });
    res.json(insumos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implementar outros métodos (getById, update, delete) de forma similar