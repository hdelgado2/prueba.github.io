import React,{useState,useEffect} from 'react';
import { Routes, Route, Outlet, Link } from "react-router-dom";

const Listados = () => {
    const [Listado, setListado] = useState([]);
    const [Filtro, setFiltro] = useState("")
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async() =>{
           let Lista = await fetch('/Listado')
           let listasViajes = Lista.json();
           listasViajes.then((result) => {
                setListado(result.data);
           })
           
        }
        fetchData();
    }, [])

    
       const fetchFiltro = async () =>{
            
            await setLoading(true)

            let search = await fetch('/Filtro/'+JSON.stringify(Filtro))
            let data = search.json();
            data.then((result) => setListado(result.data))
            
            setInterval(()=>{
                if(Listado.length > 0)
                    setLoading(false)                
            },3000)
            
       }

       const deleteViajes = async (id) =>{
            setLoading(true);                
           let listadoUpdate = await fetch('/deletePasajero/'+id);
           let data = listadoUpdate.json();
           data.then((result) => setListado(result.data))
           setInterval(()=>{
            if(Listado.length > 0)
                setLoading(false)                
            },3000)
       }
    
    

    const LoadingImg = () => {
        return(
          <>
          <div className="cargando" >
            <img className="image" width={50} height={50} src="./gif/Gear-0.2s-800px.gif" />
          </div>
          </>
        )
      }

    return (
        <>
        {Loading && <LoadingImg/>}
        <div className="row">
        <div className="col-12">
            <div className="card">
            <div className="card-header">
                <h3 className="card-title">Lista de Viajes y Vuelos</h3>
                <div className="col-sm-4 mt-2">
                <Link href="#" to='/registro' className="btn btn-primary">Registro de Clientes</Link>
                </div>
                <div className="card-tools">
                <div className="input-group input-group-sm" style={{width: 150}}>
                
                    <input type="text" onChange={e=>setFiltro(e.target.value)}  name="table_search" className="form-control float-right" placeholder="Search" />
                    <div className="input-group-append">
                    <button type="submit" onClick={e => fetchFiltro()} className="btn btn-default"><i className="fas fa-search" /></button>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="card-body table-responsive p-0">
                <table  className="table table-hover">
                <thead align="center">
                    <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>cedula</th>
                    <th>Telefono</th> 
                    <th>Accion</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {Listado && 
                     Listado.map((elem,index) => (
                        <tr key={index}>
                        <td>{elem.id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.ced}</td>
                        <td>{elem.telf}</td>
                        <td>
                            <Link to={'/editar/'+elem.id} className="btn btn-primary"><i className='fa fa-edit'></i></Link>
                            <a onClick={e =>deleteViajes(elem.id)} className="btn btn-danger"><i className='fa fa-trash'></i></a>
                            <Link to={'/detalles/'+elem.id} className="btn btn-warning"><i className='fa fa-book'></i></Link>
                        </td>
                        </tr>
                     ))
                    }
                </tbody>
                </table>
                
            </div>
            {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>

       
        </div>  
        </>
    )
}

export default Listados
