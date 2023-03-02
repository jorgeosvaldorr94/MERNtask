import React, { useContext, useState, useEffect } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import PropTypes from 'prop-types';

const Descripcion = ({ etiqueta, onClose, editar, texto }) => {

  // State para mostrar la Descripcion.
  const [descripcion, setDescripcion] = useState(texto);


  // State para mostrar la Descripcion.
  const [descripcion2, setDescripcion2] = useState('');

  // Extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext);
  const { proyecto } = proyectosContext;

  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext);
  const { tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext; 

  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con la descripción ingresada por el usuario, por ejemplo, enviarla al servidor.
    // También puedes cerrar el cuadro de descripción aquí mismo, utilizando una función de callback enviada desde Tarea.js
  };
  

  const handleCancel = () => {
    onClose(true);
  };

  const cerrar = () => {
    onClose(false);
  };

  // State de lo que escribo.
  const [cambio, setCambio] = useState('');

  const handleCambio = (e) => {
    setCambio(e.target.value);
  };

  // Funcion para cuando le de click al formulario me guarde en el state.
  const handleGuardar = (e) => {
    setDescripcion2(cambio);
    console.log(cambio);
    onClose(true); // Esto cerrará el cuadro de descripción
  };

  return (
    <div className="overlay">
      <div className="block-notas">
        <div className="tituloD">{etiqueta}</div>
        <form onSubmit={handleSubmit}>
          <div className="campo-formD">
            <label htmlFor="descripcion"></label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={handleCambio}
              disabled={!editar}
            />
          </div>

          {editar ? (
            <div className="campo-formD botonesD">
              <input 
                type="submit" 
                className="btnD btn-primarioD" 
                value="Guardar" 
                onClick={handleGuardar}
              />
              <button type="button" className="btnD btn-secundarioD" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="campo-formD botonesD">
              <button type="button" className="btnD btn-secundarioD" onClick={cerrar}>
                Cerrar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

Descripcion.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  editar: PropTypes.bool.isRequired,
  texto: PropTypes.string.isRequired,
};

export default Descripcion;
/*
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Descripcion = ({ etiqueta, onClose, editar }) => {
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
            <label htmlFor="descripcion"></label>
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
*/
/*
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Descripcion = ({ etiqueta, onClose, editar, texto }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna acción con la descripción ingresada por el usuario, por ejemplo, enviarla al servidor.
    // También puedes cerrar el cuadro de descripción aquí mismo, utilizando una función de callback enviada desde Tarea.js
  };

  const handleCancel = () => {
    onClose(true);
  };

  const cerrar = () => {
    onClose(false);
  };

  return (
    <div className="overlay">
      <div className="block-notas">
        <div className="tituloD">{etiqueta}</div>
        <form onSubmit={handleSubmit}>
          <div className="campo-formD">
            <label htmlFor="descripcion"></label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          {editar ? (
            <div className="campo-formD botonesD">
              <input type="submit" className="btnD btn-primarioD" value="Guardar" />
              <button type="button" className="btnD btn-secundarioD" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          ) : (
            <div className="campo-formD botonesD">
              <button type="button" className="btnD btn-secundarioD" onClick={cerrar}>
                Cerrar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

Descripcion.propTypes = {
  etiqueta: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  editar: PropTypes.bool.isRequired,
};

export default Descripcion;
*/