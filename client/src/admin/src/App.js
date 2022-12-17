import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import AppLayout from './components/layout/AppLayout';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';
import { blue } from "@mui/material/colors";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import PasswordReset from './pages/auth/PasswordReset';
import SendedResetLink from './pages/auth/SendedResetLink';

function App() {
  const Theme = createTheme({
    palette: { 
      primary: blue,
      natural: {
        main: '#64748B',
        contrastText: '#fff',
      },
      purple: {
        main: '#6c3cb4'
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 768,
          lg: 1025,
          xl: 1536,
        },
      },
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
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path='/sended-reset-link' element={<SendedResetLink />} />
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
