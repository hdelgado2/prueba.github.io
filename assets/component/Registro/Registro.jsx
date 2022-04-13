import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import SweetAlert from 'sweetalert2-react';
const Registro = () => {
  /***
   *  Creamos un Hooks de objeto donde se va almacenar
   *  datos del cliente
   *  */   
  const [Datos, setDatos] = useState({
      "ced":"",
      "nombre":"",
      "fechaN":"",
      "telf":""
    })
  const [Sweet, setSweet] = useState(false)
  const [Cargando, setCargando] = useState(false)
  const [Resultado, setResultado] = useState("")
  const navigate = useNavigate()
    /**
     * Capturamos los datos mediante un evento
     */
    const handleChange = (e) =>{
      setDatos({...Datos,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      setCargando(true);
      let prueba = await fetch('/cliente',{
         method:'POST',
          body: JSON.stringify(Datos)
      });
      let data = prueba.json();
      data.then((resul) => {
          setResultado(resul)
          
      });  
      
      setCargando(false)
      navigate('/');
    }

    const Loading = () => {
      return(
        <>
        <div className="cargando" >
          <img className="image" width={50} height={50} src="/gif/Gear-0.2s-800px.gif" />
        </div>
        </>
      )
    }
    return (
        <>
      <SweetAlert
      show={Sweet}
      title="Exito"
      text={Resultado}
      icon="success"
      onConfirm={() => setSweet(false)}
      />
      {Cargando && <Loading/>}

<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Registro de Clientes</h3>
  </div>
  <form role="form" onSubmit={e => handleSubmit(e) | setSweet(true)}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="ced">Cedula</label>
        <input type="text" onChange={e => handleChange(e)} id="ced" className="form-control" placeholder="Ingresar Cedula" />
      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" className="form-control" onChange={e => handleChange(e)} id="nombre" placeholder="Ingresar Nombre" />
      </div>
      <div className="form-group">
        <label htmlFor="Fecha">Fecha de Nacimiento</label>
        <div className="input-group">
            <input type="date" className="form-control" onChange={e => handleChange(e)} id="FechaN" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="telf">Telefono</label>
        <input type="text" className="form-control" onChange={e => handleChange(e)} id="telf" />
      </div>
    </div>
    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Submit</button>
    </div>
  </form>
</div>

        </>
    )
}

export default Registro
