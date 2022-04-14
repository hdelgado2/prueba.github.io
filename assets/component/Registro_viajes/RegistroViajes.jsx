import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation,Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2-react';


const RegistroViajes = () => {
    const [Viajes, setViajes] = useState({
        "codViajes":"",
        "nPlaza":"",
        "Destino":"",
        "lOrigen":"",
        "precio":0
    })
    const [Sweet, setSweet] = useState(false);
    const [Resultado, setResultado] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        
          let data = await fetch('/api/viaje/create',{
            method:'POST',
            body:JSON.stringify(Viajes)
          })
          let resut = data.json();
          resut.then((result) => {
              setResultado(result)
              setSweet(true)
          })
        
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
        navigate('/')
      }}
      />
<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Registro de Viajes</h3>
  </div>
  <form role="form" onSubmit={e =>handleSubmit(e)}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="codViajes">Codigo de Viaje</label>
        <input type="text" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="codViajes" className="form-control" placeholder="ej: vi-001" />
      </div>
      <div className="form-group">
        <label htmlFor="nPlaza">Numero de Plaza</label>
        <input type="text" className="form-control" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})}  id="nPlaza" placeholder="Ingresar Nombre" />
      </div>
      <div className="form-group">
        <label htmlFor="Destino">Destino</label>
        <div className="input-group">
            <input type="text" className="form-control" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="Destino" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="lOrigen">Lugar Origen</label>
        <input type="text" className="form-control" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="lOrigen" />
      </div>
      <div className="form-group">
        <label htmlFor="precio">Precio</label>
        <input type="number" className="form-control" id="precio" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} />
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
export default RegistroViajes;
