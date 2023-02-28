import React, { useReducer } from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = props => {
    // Vamos a colocar de estado inicial una alerte que va a sr nula
    const initialState = {
        alerta: null
    };

    // aplicamos destructuring para extarer de la funcion alertaReducer.
    const [ state, dispatch ] = useReducer(alertaReducer, initialState);

    // Funciones
    const mostrarAlerta = ( msg, categoria ) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                // Aqui lo correcto seria poner msg y categoria, xq se llaman iguales (se llama object literal).
                msg: msg,
                categoria: categoria
            }
        });

        // Funcion para que desaparezca la alerta despues de 3 segundos.
        setTimeout( () => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)

    };

    // EEEEELLLLIIIIMMMMIIIINNNNAAAARRRRR
    //console.log(mostrarAlerta);

    return (
        <alertaContext.Provider
            value={{
                // Enviamos nuestros states y funciones
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {/* Todos los componentes y states que requerimos */}
            {props.children}
        </alertaContext.Provider>
    )
};

export default AlertaState;