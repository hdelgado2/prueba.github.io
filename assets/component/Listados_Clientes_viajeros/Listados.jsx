import React,{useState,useEffect} from 'react';


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
            await fetch('/deletePasajero/'+id);
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
                <h3 className="card-title">Lista de Viajes</h3>
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
                <table className="table table-hover">
                <thead >
                    <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>cedula</th>
                    <th>Telefono</th> 
                    <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {Listado && 
                     Listado.map((elem,index) => (
                        <tr key={index}>
                        <td>{elem.id}</td>
                        <td>{elem.name}</td>
                        <td>{elem.ced}</td>
                        <td>{elem.telf}</td>
                        <td>
                            <a to='' className="btn btn-primary"><i className='fa fa-edit'></i></a>
                            <a onClick={e =>deleteViajes(elem.id)} className="btn btn-danger"><i className='fa fa-trash'></i></a>
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

        <div className="form-group row">
                    <label>Paginacion</label>
                    <input className="col-md-4 form-control"></input>
        </div>
        </div>  
        </>
    )
}

export default Listados
