import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    lucroMensal: [],
    produtosVendidos: [],
    insumosUtilizados: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    }
  };

  const lucroMensalData = {
    labels: dashboardData.lucroMensal.map(item => item.mes),
    datasets: [
      {
        label: 'Lucro (R$)',
        data: dashboardData.lucroMensal.map(item => item.lucro),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const produtosVendidosData = {
    labels: dashboardData.produtosVendidos.map(item => item.produto),
    datasets: [
      {
        label: 'Vendas',
        data: dashboardData.produtosVendidos.map(item => item.quantidade),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  const insumosUtilizadosData = {
    labels: dashboardData.insumosUtilizados.map(item => item.insumo),
    datasets: [
      {
        label: 'Quantidade Utilizada',
        data: dashboardData.insumosUtilizados.map(item => item.quantidade),
        fill: false,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1
      }
    ]
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        Dashboard Analítico
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Lucro Mensal
            </Typography>
            <Bar data={lucroMensalData} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Produtos Mais Vendidos
            </Typography>
            <Pie data={produtosVendidosData} />
          </Paper>
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Insumos Mais Utilizados
            </Typography>
            <Line data={insumosUtilizadosData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;