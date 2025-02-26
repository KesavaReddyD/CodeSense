import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import {Toaster} from 'react-hot-toast';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-right'/>
      <App />
    </AuthProvider>
  </StrictMode>,
)
