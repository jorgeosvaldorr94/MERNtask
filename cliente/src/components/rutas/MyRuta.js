import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';

const MyRuta = ({ element }) => {

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const { autenticado, usuarioAutenticado } = authContext;


    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, []);
    

    if(!autenticado){
        navigate("/");
    }


    return;
}

export default MyRuta;