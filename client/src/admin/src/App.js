import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from "@mui/material/colors";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const Theme = createTheme({
    palette: { 
      primary: blue,
      natural: {
        main: '#64748B',
        contrastText: '#fff',
      }
    },
  });
  
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
