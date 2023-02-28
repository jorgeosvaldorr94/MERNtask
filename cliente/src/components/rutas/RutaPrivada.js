import React, { useContext, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const RutaPrivada = ({ element: Element, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);

    return (
      autenticado ? (
        <Route {...props} element={<Element {...props} />} />
      ) : (
        <Navigate to="/" replace />
      )
    );
}
 
export default RutaPrivada;




