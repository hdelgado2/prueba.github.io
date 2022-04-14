import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'

const Detalles2 = () => {
    
    const [Detalles, setDetalles] = useState({
        "cod":"",
        "origen":"",
        "destino":"",
        "precio":"",
        "disponible":0
    });
    let {pathname} = useLocation();
    let inicio,ruta,params;
    [inicio,ruta,params] = pathname.split("/");
    useEffect(() => {
        const fetchData = async () =>{
            let detalles = await fetch('/api/viaje/detallesViajes/'+params)
            let data = detalles.json();

            data.then(({data}) => {
                setDetalles({
                    "cod":data[0]['codigo'],
                    "origen":data[0]['origen'],
                    "destino":data[0]['destino'],
                    "precio":data[0]['precio'],
                    "disponible":data[0]['disponible']
                })
            })
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="card">
        <div className="card-header">
            <h3 className="card-title">Detalles del Viaje <span></span></h3>
        </div>
        <div className="card-body">
            <div className="row text-center">
            <div className="col-sm-3">
                    <label>Codigo</label>
                    <p>{Detalles.cod}</p>
                </div>
                <div className="col-sm-3">
                    <label>Origen</label>
                    <p>{Detalles.origen}</p>
                </div>
                <div className="col-sm-3">
                    <label>Destino</label>
                    <p>{Detalles.destino}</p>
                </div>
                <div className="col-sm-3">
                    <label>Precio</label>
                    <p>{Detalles.precio}</p>
                </div>
                <div className="col-sm-3">
                    <label>Disponible</label>
                    <p>{Detalles.disponible}</p>
                </div>
            </div>

            <div className="col-md-12">
                    <h5>Pasajeros a Bordo</h5>
                        <table  className="table table-hover ">
                        <thead>
                            <tr>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Numero de Plazas</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                
                            </tr>
                        </tbody>
                        </table>
                </div>
            <Link to="/listaViajes" className="btn btn-default">Atras</Link>
        </div>
        
        </div>   
        </>
    )
}

export default Detalles2
