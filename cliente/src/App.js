import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { BrowserRouter as Router, Routes, Route, Redirect, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projectos/Proyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token'
//import RutaPrivada from './components/rutas/RutaPrivada';
//import MyRuta from './components/rutas/MyRuta';
//<Route path="/proyectos" element={<MyRuta />} />
// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}
function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route path="/proyectos" element={<Proyectos />} />
                
              </Routes>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}
export default App;

