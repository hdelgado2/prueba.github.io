import React,{ useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
const Detalles = () => {
    let {pathname} = useLocation();
    const [Datos, setDatos] = useState({
        "ced":"",
        "nombre":"",
        "fechaN":"",
        "telf":""
      })
    const [Viajes, setViajes] = useState([]);

    let inicio,ruta,params;
    [inicio,ruta,params] = pathname.split("/");
    
    useEffect(() => {
        const fetchData = async () => {
            let data = await fetch('/detalleCliente/'+params);
            let resut = data.json();

            resut.then(({data,viajesR}) => {
                setDatos({
                    "ced":data[0]['ced'],
                    "nombre":data[0]['name'],
                    "fechaN":data[0]['fech'],
                    "telf":data[0]['telf']
                })

                setViajes(viajesR);
            })
        }
        fetchData();
    }, [])

    return (
        <>
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">Detalles del Viajero <span>{Datos.nombre}</span></h3>
        </div>
        <div className="card-body">
            <div className="row text-center">
            <div className="col-md-4">
                    <label>Cedula</label>
                    <p>{Datos.ced}</p>
                </div>
                <div className="col-md-4">
                    <label>Año de Nacimiento</label>
                    <p>{Datos.fechaN}</p>
                </div>
                <div className="col-md-4">
                    <label>Telefono</label>
                    <p>{Datos.telf}</p>
                </div>
                <div className="col-md-12">
                    <h5>Detalles de viajes</h5>
                        <table  className="table table-hover">
                        <thead align="center">
                            <tr>
                            <th>Codigo</th>
                            <th>Destino</th>
                            <th>Numero de Plazas</th>
                            <th>Lugar Origen</th> 
                            <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                           {Viajes.map((elem,index) => 
                             <tr key={index}>
                             <td>{elem.codigo_viaje}</td>
                             <td>{elem.destino}</td>
                             <td>{elem.num_plaza}</td>
                             <td>{elem.origen}</td>
                             <td>{elem.precio}</td>
                            </tr>
                           )}
                        </tbody>
                        </table>
                </div>
            </div>
            <Link to="/" className="btn btn-default">Atras</Link>
        </div>
        
        </div>

        </>
    )
}

export default Detalles
