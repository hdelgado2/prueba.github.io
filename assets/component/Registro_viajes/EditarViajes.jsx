import React, { useEffect,useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import SweetAlert from 'sweetalert2-react';

const EditarViajes = () => {
    let {pathname} = useLocation();
    let inicio,ruta,params;
    [inicio,ruta,params] = pathname.split("/");
    const [Viajes, setViajes] = useState({
        "codViajes":"",
        "nPlaza":"",
        "Destino":"",
        "lOrigen":"",
        "precio":0
    })
    const [Sweet, setSweet] = useState(false);
    const [Resultado, setResultado] = useState("")
    const [Loading, setLoading] = useState(true);
    const navigate = useNavigate()

    /*Hooks de validaciones */
    const [codigoViaje, setcodigoViaje] = useState("");
    const [codigoViajeValid, setcodigoViajeValid] = useState(false);
    const [num_plaza, setnum_plaza] = useState("")
    const [num_plazaInvalid, setnum_plazaInvalid] = useState(false)
    const [Destino, setDestino] = useState("")
    const [DestinoInvalid, setDestinoInvalid] = useState(false)
    const [Origen, setOrigen] = useState("")
    const [OrigenInvalid, setOrigenInvalid] = useState(false)
    const [Precio, setPrecio] = useState("");
    const [PrecioInvalid, setPrecioInvalid] = useState(false);


    useEffect(() => {
        const fetchData = async()=>{
            let data = await fetch('/api/viaje/edit/'+params);

            let edit = data.json();

            edit.then(({data}) => {
                setViajes({
                    "codViajes":data[0]['codigo'],
                    "nPlaza":data[0]['disponible'],
                    "Destino":data[0]['destino'],
                    "lOrigen":data[0]['origen'],
                    "precio":data[0]['precio']
                })
            })
        }
        
        fetchData();
    }, [])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        let enviar = await fetch('/api/viaje/update/'+params,{
            method:'POST',
            body:JSON.stringify(Viajes)            
        });
        let resut = enviar.json();
          resut.then((result) => {
              if(result === 'Se Ha Actualizad El viaje'){
                setResultado(result)
                if(Resultado.length > 0) setLoading(false);
                setSweet(true)
              }else{
                result.forEach(elem => {
                    if(elem.campo === 'codigo_viaje'){
                     setcodigoViaje(elem.errores);
                     setcodigoViajeValid(elem.is_invalid);
                    }else if(elem.campo === 'num_plaza'){
                     setnum_plaza(elem.errores);
                     setnum_plazaInvalid(elem.is_invalid);
                    }else if(elem.campo === 'destino'){
                     setDestino(elem.errores);
                     setDestinoInvalid(elem.is_invalid);
                    }else if(elem.campo === 'origen'){
                     setOrigen(elem.errores);
                     setOrigenInvalid(elem.is_invalid);
                    }else{
                     setPrecio(elem.errores);
                     setPrecioInvalid(elem.is_invalid);
                    }
                 });
              }
              
              
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
        setLoading(false);
        //Espera 3 segundo y vuelve al listado  
        window.location.href = '/listaViajes'
        
      }}
      />
      
        <div className="card card-primary">
        <div className="card-header">
            <h3 className="card-title">Editar Viajes</h3>
        </div>
        <form role="form" onSubmit={e =>handleSubmit(e)}>
            <div className="card-body">
            <div className="form-group">
                <label htmlFor="codViajes">Codigo de Viaje</label>
                <input type="text"  
                 value={Viajes.codViajes} 
                 onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} 
                 id="codViajes" 
                 placeholder="ej: vi-001" 
                 className={`form-control ${codigoViajeValid ? 'is-invalid' : 'form-control'}`} />
                 {codigoViajeValid && <p style={{color:"red"}}>{codigoViaje}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="nPlaza">Numero de Plaza</label>
                <input type="number" 
                readOnly={!Loading} 
                className={`form-control ${ num_plazaInvalid ? 'is-invalid' : 'form-control'}`}  
                value={Viajes.nPlaza} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})}  id="nPlaza" placeholder="Ingresar Nombre" />
                {num_plazaInvalid && <p style={{color:"red"}}>{num_plaza}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="Destino">Destino</label>
                <input type="text" 
                 readOnly={!Loading} 
                 className={`form-control ${ DestinoInvalid ? 'is-invalid' : 'form-control'}`}  
                 value={Viajes.Destino} 
                 onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} 
                 id="Destino" />
                {DestinoInvalid && <p style={{color:"red"}}>{Destino}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="lOrigen">Lugar Origen</label>
                <input type="text" 
                readOnly={!Loading} 
                value={Viajes.lOrigen} 
                className={`form-control ${ OrigenInvalid ? 'is-invalid' : 'form-control'}`}  
                onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="lOrigen" />
                {DestinoInvalid && <p style={{color:"red"}}>{Origen}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number"
                 readOnly={!Loading}
                 value={Viajes.precio} 
                 id="precio" 
                 className={`form-control ${ PrecioInvalid ? 'is-invalid' : 'form-control'}`}  
                 onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} />
                 {PrecioInvalid && <p style={{color:"red"}}>{Precio}</p>}
            </div>
            </div>
            <div className="card-footer">
            {(!Loading) ? <button 
                          className="btn btn-primary" 
                          type="button" 
                          disabled>
                         <span 
                          className="spinner-grow spinner-grow-sm" 
                          role="status" 
                          aria-hidden="true" />
                            Loading...
                          </button>
                        : 
                        <button 
                         type="submit" 
                         className="btn btn-primary">
                         Actualizar
                         </button>
                        }
                        <Link to="/listaViajes" href="#" className="btn btn-default">Atras</Link>
                        

            </div>
        </form>
        </div>        
        </>
    )
}

export default EditarViajes
