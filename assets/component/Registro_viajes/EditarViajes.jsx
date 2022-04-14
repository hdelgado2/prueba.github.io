import React, { useEffect,useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

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


    return (
        <>
        <div className="card card-primary">
        <div className="card-header">
            <h3 className="card-title">Editar Viajes</h3>
        </div>
        <form role="form" onSubmit={e =>handleSubmit(e)}>
            <div className="card-body">
            <div className="form-group">
                <label htmlFor="codViajes">Codigo de Viaje</label>
                <input type="text" value={Viajes.codViajes} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="codViajes" className="form-control" placeholder="ej: vi-001" />
            </div>
            <div className="form-group">
                <label htmlFor="nPlaza">Numero de Plaza</label>
                <input type="number" className="form-control" value={Viajes.nPlaza} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})}  id="nPlaza" placeholder="Ingresar Nombre" />
            </div>
            <div className="form-group">
                <label htmlFor="Destino">Destino</label>
                <div className="input-group">
                    <input type="text" className="form-control" value={Viajes.Destino} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="Destino" />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="lOrigen">Lugar Origen</label>
                <input type="text" className="form-control" value={Viajes.lOrigen} onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} id="lOrigen" />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input type="number" className="form-control" value={Viajes.precio} id="precio" onChange={e=>setViajes({...Viajes,[e.target.id]:e.target.value})} />
            </div>
            </div>
            <div className="card-footer">
            <button type="submit" className="btn btn-primary">Actualizar</button>
            <Link to="/listaViajes" href="#" className="btn btn-default">Atras</Link>

            </div>
        </form>
        </div>        
        </>
    )
}

export default EditarViajes
