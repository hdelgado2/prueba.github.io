import React from 'react'
import Listados from '../Listados_Clientes_viajeros/Listados'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Registro from '../Registro/Registro';
import Editar from '../Registro/Editar';
import Error from '../Error';
const Menu = () => {
    return (
<>
<div className="container">
  <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
    <div className="container">
      <a href="#" className="navbar-brand">
          <span className="brand-text font-weight-light">Agencia de Viaje</span>
      </a>
      
      <div className="collapse navbar-collapse order-3" id="navbarCollapse">
      
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="#" to='/' className="nav-link">Listado de Viajes</Link>
          </li>
          <li className="nav-item">
            <Link href="#" to='/registro' className="nav-link">Registro</Link>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
    <br></br>
    
      <Routes>
          <Route path="/" element={<Listados/>}/>
          <Route path="/registro" element={<Registro />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="*" element={<Error />} />
      </Routes>

      <Outlet />      
  </div>
  

</>
    )
}


export default Menu
