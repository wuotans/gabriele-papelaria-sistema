import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import InsumosPage from './pages/InsumosPage';
import ProdutosPage from './pages/ProdutosPage';
import VendasPage from './pages/VendasPage';
import PedidosPage from './pages/PedidosPage';
import DashboardPage from './pages/DashboardPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Roxo
    },
    secondary: {
      main: '#ff9800', // Laranja
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/insumos" element={<InsumosPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/vendas" element={<VendasPage />} />
            <Route path="/agenda" element={<PedidosPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;