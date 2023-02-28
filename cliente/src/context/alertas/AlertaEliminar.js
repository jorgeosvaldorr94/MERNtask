import React from 'react';

// Importar la libreria de las alertas.
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const AlertaEliminar = ({ mensaje, onConfirm }) => {
    confirmAlert({
      title: "Confirmar eliminación",
      message: mensaje,
      buttons: [
        {
          label: "Sí",
          onClick: onConfirm,
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      customUI: ({ onClose }) => {
        return (
          <div className="alerta-eliminar">
            <h1>{mensaje}</h1>
  
            <button className="alerta-eliminar-null" onClick={onClose}>
              Cancelar
            </button>
  
            <button
              className="alerta-eliminar-true"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Eliminar
            </button>
          </div>
        );
      },
    });
  };
  
  export default AlertaEliminar;
