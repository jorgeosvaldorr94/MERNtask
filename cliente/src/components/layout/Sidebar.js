import React from 'react';
import NuevoProyecto from '../projectos/NuevoProyecto';
import ListadoProyecto from '../projectos/ListadoProyectos';

const Sidebar = () => {


    return ( 
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <NuevoProyecto/>

            <div className='proyectos'>
                <ListadoProyecto/>
            </div>
        </aside>
     );
}
 
export default Sidebar;
