import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import SweetAlert from 'sweetalert2-react';

const ListaViajes = () => {
    const [Listado, setListado] = useState([]);
    const [Filtro, setFiltro] = useState("");
    const [Sweet, setSweet] = useState(false)
    const [Error, setError] = useState("")
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

    const filtrar = async(e) => {
        e.preventDefault();
        let fetchData = await fetch('/api/viaje/filtro/'+JSON.stringify(Filtro))
        let data = fetchData.json();
        data.then(({data}) => setListado(data));
    }

    const deleted = async(e,id) => {
        e.preventDefault();
        
        let deletedData = await fetch('/api/viaje/deleted/'+id)
        let listaUpdate = deletedData.json();

        listaUpdate.then(({data}) => {
            if(data === "No se Puede ELiminar el Viaje ya que hay pasajeros"){
                setSweet(true);
                setError(data)
            }else{
                setListado(data)
            }
            
        })
    }

    return (
        <>
         <div className="row">
         <SweetAlert
      show={Sweet}
      title="Erro"
      text={Error}
      icon="success"
      onConfirm={() => {
          setSweet(false)
        }}></SweetAlert>
        <div className="col-12">
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Lista de Vuelos</h3>
                <br />
                <Link href="#" to='/registroViajes' className="btn btn-primary">Registro de Viajes</Link>
                <div className="card-tools">
                <div className="input-group input-group-sm" style={{width: 150}}>
                
                    <input type="text" onChange={e => setFiltro(e.target.value)}  name="table_search" className="form-control float-right" placeholder="Search" />
                    <div className="input-group-append">
                    <button type="submit"  className="btn btn-default" onClick={e => filtrar(e)}><i className="fas fa-search" /></button>
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
                            <tr key={index}>
                            <td>{elem.id}</td>
                            <td>{elem.codigo}</td>
                            <td>{elem.origen}</td>
                            <td>{elem.destino}</td>
                            <td>{elem.precio}</td>
                            <td>
                                <Link to={"/editarviajes/"+elem.id} className="btn btn-primary"><i className='fa fa-edit'></i></Link>
                                <a onClick={e=>deleted(e,elem.id)} className="btn btn-danger"><i className='fa fa-trash'></i></a>
                                <Link to={"/detallesviajes/"+elem.id} className="btn btn-warning"><i className='fa fa-book'></i></Link> 
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