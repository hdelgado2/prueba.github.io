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
    const [Loading, setLoading] = useState(false);

    const navigate = useNavigate()


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
              setResultado(result)
              if(Resultado.length > 0) setLoading(false);
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
                <input type="text" readOnly value={Viajes.codViajes} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="codViajes" className="form-control" placeholder="ej: vi-001" />
            </div>
            <div className="form-group">
                <label htmlFor="nPlaza">Numero de Plaza</label>
                <input type="number" readOnly={!Loading} className="form-control" value={Viajes.nPlaza} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})}  id="nPlaza" placeholder="Ingresar Nombre" />
            </div>
            <div className="form-group">
                <label htmlFor="Destino">Destino</label>
                <div className="input-group">
                    <input type="text" readOnly={!Loading} className="form-control" value={Viajes.Destino} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="Destino" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="lOrigen">Lugar Origen</label>
                <input type="text" readOnly={!Loading} className="form-control" value={Viajes.lOrigen} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="lOrigen" />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number" readOnly={!Loading} className="form-control" value={Viajes.precio} id="precio" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} />
            </div>
            </div>
            <div className="card-footer">
            {(Loading) ? <button 
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
