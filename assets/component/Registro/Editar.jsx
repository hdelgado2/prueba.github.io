import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import SweetAlert from 'sweetalert2-react';
import { Link } from "react-router-dom";
import { array } from 'prop-types';

const Editar = () => {
    let {pathname} = useLocation();
    let inicio,ruta,params;
    [inicio,ruta,params] = pathname.split("/");
    const [Sweet, setSweet] = useState(false)
    const [Resultado, setResultado] = useState("")
    const navigate = useNavigate()
    const [Viajes, setViajes] = useState([]);
    const [Editar, setEditar] = useState({
        "ced":"",
        "nombre":"",
        "fechaN":"",
        "telf":"",
        "id":"",
        viajes:[],
        "elimiViajes":[]
      })
    const [Loading, setLoading] = useState(false);
    const [RegiTravel, setRegiTravel] = useState([]);
    
    /* Hooks de Validacion */
    const [Ced, setCed] = useState("");
    const [CedValid, setCedValid] = useState(false);
    const [Nombre, setNombre] = useState("")
    const [NombreInvalid, setNombreInvalid] = useState(false)
    const [Telf, setTelf] = useState("")
    const [TelfInvalid, setTelfInvalid] = useState(false)


    useEffect(() =>{
       const fetchData = async() => {
           let data = await fetch('/pullCliente/'+params)
           let prueba = data.json();
           prueba.then(({data,viajes,ViajesR}) =>{
                console.log()
               setEditar({
                   "nombre":data[0]["name"],
                   "ced":data[0]['ced'],
                   "fechaN":data[0]["fech"],
                   "telf":data[0]['telf'],
                   "id":data[0]['id'],
                   viajes:ViajesR,
                   "elimiViajes":[]
               })

               setViajes(viajes);
           })
       }
       fetchData()


    },[]);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        let datos = await fetch('/updateCliente',{
            method:'POST',
            body: JSON.stringify(Editar)
        });

        let resut = datos.json();
        resut.then((result) => {
            if(result === 'Se Ha Actualizado El Cliente '){
                setSweet(true);
                setResultado(result);   
            }else{
                result.map((elem) => {
                  if(elem.campo === 'name'){
                    setNombre(elem.errores);
                    setNombreInvalid(elem.is_invalid);
                  }else if(elem.campo === 'cedula'){
                    setCed(elem.errores);
                    setCedValid(elem.is_invalid);
                  }else if(elem.campo === 'telf'){
                    setTelf(elem.errores);
                    setTelfInvalid(elem.is_invalid);
                  }
                })
              }
      
              setLoading(false);
        })

    }

    function capturar(e){
        var search = Editar.viajes.filter((elem) => (elem.id === Number(e.target.value)))
        if(search.length > 0) return ;//no permite añadir otro igual

        var capture = Viajes.filter((elem) => (elem.id === Number(e.target.value)))
        var objet = Object.assign([],capture);

        setEditar({
            ...Editar,
            viajes:[...Editar.viajes,objet[0]]
        });
        
    }
    const DeleteItem = (id) => {
        var tempDelete = Editar.viajes.filter((elem,index) => (elem['id'] !== Number(id)) );
        var DeleteViaje = Editar.viajes.filter((elem,index) => (elem['id'] === Number(id)) );

        setEditar({
            ...Editar,
            viajes:tempDelete,
            'elimiViajes':[...Editar.elimiViajes,DeleteViaje[0]]
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
                <h3 className="card-title">Editar Clientes</h3>
            </div>
            <form role="form" method="post" onSubmit={e => HandleSubmit(e)}>
                <div className="card-body">
                <div className="form-group">
                    <label htmlFor="ced">Cedula</label>
                    <input 
                     type="text" 
                     id="ced" 
                     value={Editar.ced} 
                     onChange={e=>setEditar({...Editar,[e.target.id]:e.target.value})} 
                     className={`form-control ${CedValid ? 'is-invalid' : 'form-control'}`} 
                     placeholder="Ingresar Cedula" />
                     {CedValid && <p style={{color:"red"}}>{Ced}</p>}

                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                     type="text"
                     className={`form-control ${NombreInvalid ? 'is-invalid' : 'form-control'}`} 
                     value={Editar.nombre} 
                     onChange={e=>setEditar({...Editar,[e.target.id]:e.target.value})} 
                     id="nombre"
                     placeholder="Ingresar Nombre" />
                     {NombreInvalid && <p style={{color:"red"}}>{Nombre}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="FechaN">Fecha de Nacimiento</label>
                    <div className="input-group">
                        <input type="text" className="form-control" 
                        value={Editar.fechaN} 
                        onChange={e=>setEditar({...Editar,[e.target.id]:e.target.value})}
                         id="fechaN" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="telf">Telefono</label>
                    <input 
                    type="text"  
                    className={`form-control ${TelfInvalid ? 'is-invalid' : 'form-control'}`} 
                    value={Editar.telf} 
                    onChange={e=>setEditar({...Editar,[e.target.id]:e.target.value})} 
                    id="telf" />
                    {TelfInvalid && <p style={{color:"red"}}>{Telf}</p>}
                </div>
                <label>Agregar Viaje</label>
                <select onChange={e => capturar(e)} className="form-control">
                <option value="0" selected disabled>Seleccione</option>
                {Viajes.map((elem,index) => 
                        <option key={index} value={elem.id}>{elem.codigo_viaje+' - '+elem.origen+' - '+elem.destino}</option>
                        )}
                </select>
                
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
                            <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {Editar.viajes.map((elem,index) => 
                            <tr key={index}>
                                <td>{elem['codigo_viaje']}</td>
                                <td>{elem['destino']}</td>
                                <td>{elem['num_plaza']}</td>
                                <td>{elem['origen']}</td>
                                <td>{elem['precio']}</td>
                                <td><a onClick={e => DeleteItem(elem['id'])} className="btn btn-danger"><i className='fa fa-trash'></i></a>
</td>
                            </tr>
                            )}
                        </tbody>
                        </table>
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
                <Link to="/" href="#" className="btn btn-default">Atras</Link>

                </div>
            </form>
            </div>  
        </>
    )
}

export default Editar
