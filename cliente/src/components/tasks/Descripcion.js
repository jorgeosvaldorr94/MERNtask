import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Descripcion = ({ etiqueta, onClose }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con la descripción ingresada por el usuario, por ejemplo, enviarla al servidor.
    // También puedes cerrar el cuadro de descripción aquí mismo, utilizando una función de callback enviada desde Tarea.js
  };

  const handleCancel = () => {
    onClose(true);
  };

  return (
    <div className="overlay">
      <div className="block-notas">
        <div className="tituloD">{etiqueta}</div>
        <form onSubmit={handleSubmit}>
          <div className="campo-formD">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="campo-formD botonesD">
            <input type="submit" className="btnD btn-primarioD" value="Guardar" />
            <button type="button" className="btnD btn-secundarioD" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Descripcion.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Descripcion;