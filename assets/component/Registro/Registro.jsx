import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
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

  /* Hooks de Validacion */
    const [Ced, setCed] = useState("");
    const [CedValid, setCedValid] = useState(false);
    const [Nombre, setNombre] = useState("")
    const [NombreInvalid, setNombreInvalid] = useState(false)
    const [Telf, setTelf] = useState("")
    const [TelfInvalid, setTelfInvalid] = useState(false)
    
    /**
     * Capturamos los datos mediante un evento
     */
    const handleChange = (e) =>{
      setDatos({...Datos,[e.target.id]:e.target.value})
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      let prueba = await fetch('/cliente',{
         method:'POST',
          body: JSON.stringify(Datos)
      });
      let data = prueba.json();
      data.then((resul) => {
        console.log(resul)
          if(resul === 'Se Ha Registrado Un nuevo Cliente'){
            setSweet(true);
            setResultado(resul);
            
          }else{
            resul.map((elem) => {
              if(elem.campo === 'name'){
                setNombre(elem.errores);
                setNombreInvalid(elem.is_invalid);
              }else if(elem.campo === 'cedula'){
                setCed(elem.errores);
                setCedValid(elem.is_invalid);
              }else if(elem.campo === 'telf'){
                setTelf(elem.errores);
                setTelfInvalid(elem.is_invalid);
              }
            })
          }
      });  
      
      setCargando(false)
      
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
      onConfirm={() => {
        setSweet(false)
        navigate('/');
      }}
      />

<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Registro de Clientes</h3>
  </div>
  <form role="form" onSubmit={e => handleSubmit(e)}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="ced">Cedula</label>
        <input 
         type="text" 
         onChange={e => handleChange(e)} 
         id="ced" 
         className={`form-control ${CedValid ? 'is-invalid' : 'form-control'}`} 
         placeholder="Ingresar Cedula" 
          />
        {CedValid && <p style={{color:"red"}}>{Ced}</p>}

      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          className={`form-control ${NombreInvalid ? 'is-invalid' : 'form-control'}`} 
          onChange={e => handleChange(e)} id="nombre" placeholder="Ingresar Nombre" />
          {NombreInvalid && <p style={{color:"red"}}>{Nombre}</p>}

      </div>
      <div className="form-group">
        <label htmlFor="Fecha">Fecha de Nacimiento</label>
        <div className="input-group">
            <input type="date" className="form-control" onChange={e => handleChange(e)} id="FechaN" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="telf">Telefono</label>
        <input 
         type="text" 
         className={`form-control ${TelfInvalid ? 'is-invalid' : 'form-control'}`} 
         onChange={e => handleChange(e)} id="telf" />
         {TelfInvalid && <p style={{color:"red"}}>{Telf}</p>}
      </div>
    </div>
    <div className="card-footer">
      <button type="submit" className="btn btn-primary">Registrar</button>
      <Link to="/" href="#" className="btn btn-default">Atras</Link>

    </div>
  </form>
</div>

        </>
    )
}

export default Registro
