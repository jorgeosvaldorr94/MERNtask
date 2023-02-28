import { 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS, 
    AGREGAR_PROYECTO,
    PROYECTO_ERROR, 
    VALIDAR_FORMULARIO, 
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO 
} from "../../types";

const proyectoReducer = (state, action) => {
    switch(action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos:[ action.payload, ...state.proyectos ],
                formulario: false,
                errorFormulario: false
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje:action.payload
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            const proyectoActual = state.proyectos.find(proyecto => proyecto._id === action.payload);
            return {
                ...state,
                proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload),
                boton: proyectoActual ? proyectoActual.nombre : ''
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }

        default:
            return state;
    }
};

export default proyectoReducer;