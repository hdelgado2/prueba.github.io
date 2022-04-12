import React from 'react'
import Listados from '../Listados_Clientes_viajeros/Listados'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Registro from '../Registro/Registro';
const Menu = () => {
    return (
<>
<div className="container">
  <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
    <div className="container">
      <a href="index3.html" className="navbar-brand">
          <span className="brand-text font-weight-light">AdminLTE 3</span>
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
      </Routes>

      <Outlet />      
  </div>
  

</>
    )
}


export default Menu
