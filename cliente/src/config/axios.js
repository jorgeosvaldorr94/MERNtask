import axios from 'axios';

const clienteAxios = axios.create({
    // Cada vez que llamemos a este cliente, va a tener una URL como base
    baseURL: process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;