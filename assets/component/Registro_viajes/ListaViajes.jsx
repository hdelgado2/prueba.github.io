import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const ListaViajes = () => {
    const [Listado, setListado] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            let data = await fetch('/api/viaje/lista');
            let viajes = data.json();
            viajes.then(({data}) => {
                setListado(data);
            })
            
        }
        
        fetchData()
    }, [])

    return (
        <>
         <div className="row">
        <div className="col-12">
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Lista de Vuelos</h3>
                <div className="card-tools">
                <div className="input-group input-group-sm" style={{width: 150}}>
                    <input type="text"   name="table_search" className="form-control float-right" placeholder="Search" />
                    <div className="input-group-append">
                    <button type="submit"  className="btn btn-default"><i className="fas fa-search" /></button>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="card-body table-responsive p-0">
                <table  className="table table-hover">
                <thead align="center">
                    <tr>
                    <th>ID</th>
                    <th>Codigo</th>
                    <th>Origen</th>
                    <th>Destino</th> 
                    <th>Precio</th>
                    <th>Accion</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {
                        Listado && 
                        Listado.map((elem,index) => (
                            <tr>
                            <td>{elem.id}</td>
                            <td>{elem.codigo}</td>
                            <td>{elem.origen}</td>
                            <td>{elem.destino}</td>
                            <td>{elem.precio}</td>
                            <td>
                                <Link to="*" className="btn btn-primary"><i className='fa fa-edit'></i></Link>
                                <a  className="btn btn-danger"><i className='fa fa-trash'></i></a>
                                <Link to="*" className="btn btn-warning"><i className='fa fa-book'></i></Link> 
                            </td>
                            </tr>
                        ))
                    }
                       
                    
                    
                </tbody>
                </table>
                
            </div>
            </div>
        </div>

       
        </div>  
        </>
    )
}

export default ListaViajes