import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import SweetAlert from 'sweetalert2-react';


const Registro = () => {
  /***
   *  Creamos un Hooks de objeto donde se va almacenar
   *  datos del cliente
   *  */   
  const [Datos, setDatos] = useState({
      "ced":"",
      "nombre":"",
      "fechaN":"",
      "telf":"",
      viajes:[],

    })
  const [Sweet, setSweet] = useState(false)
  const [Resultado, setResultado] = useState("")
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false);
  const [Viajes, setViajes] = useState([]);


  /* Hooks de Validacion */
    const [Ced, setCed] = useState("");
    const [CedValid, setCedValid] = useState(false);
    const [Nombre, setNombre] = useState("")
    const [NombreInvalid, setNombreInvalid] = useState(false)
    const [Telf, setTelf] = useState("")
    const [TelfInvalid, setTelfInvalid] = useState(false)
    
    /**
     * Capturamos los datos mediante un evento
     */
    const handleChange = (e) =>{
      setDatos({...Datos,[e.target.id]:e.target.value})
    }

    useEffect(() => {
      const fetchData = async() => {
        let data = await fetch('/pullViajes')
        let prueba = data.json();
        prueba.then(({viajesExiste}) =>{
            setViajes(viajesExiste);
        })
      }
      fetchData();
    }, [])
    const handleSubmit = async (e) =>{
      e.preventDefault();
      setLoading(true);
      let prueba = await fetch('/cliente',{
         method:'POST',
          body: JSON.stringify(Datos)
      });
      let data = prueba.json();
      data.then((resul) => {

          if(resul === 'Se Ha Registrado Un nuevo Cliente'){
            setSweet(true);
            setResultado(resul);
            
          }else{
            resul.map((elem) => {
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
        });  
      
      
      
    }

    function capturar(e){
      var search = Datos.viajes.filter((elem) => (elem.id === Number(e.target.value)))
      if(search.length > 0) return ;//no permite añadir otro igual

      var capture = Viajes.filter((elem) => (elem.id === Number(e.target.value)))
      var objet = Object.assign([],capture);
      console.log(objet);
      setDatos({
          ...Datos,
          viajes:[...Datos.viajes,objet[0]]
      });
      
  }

  const DeleteItem = (id) => {
    var tempDelete = Datos.viajes.filter((elem,index) => (elem['id'] !== Number(id)) );

    setDatos({
        ...Datos,
        viajes:tempDelete,
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
        navigate('/');
      }}
      />

<div className="card card-primary">
  <div className="card-header">
    <h3 className="card-title">Registro de Clientes</h3>
  </div>
  <form role="form" onSubmit={e => handleSubmit(e)}>
    <div className="card-body">
      <div className="form-group">
        <label htmlFor="ced">Cedula</label>
        <input 
         type="text" 
         onChange={e => handleChange(e)} 
         id="ced" 
         className={`form-control ${CedValid ? 'is-invalid' : 'form-control'}`} 
         placeholder="Ingresar Cedula" 
          />
        {CedValid && <p style={{color:"red"}}>{Ced}</p>}

      </div>
      <div className="form-group">
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          className={`form-control ${NombreInvalid ? 'is-invalid' : 'form-control'}`} 
          onChange={e => handleChange(e)} id="nombre" placeholder="Ingresar Nombre" />
          {NombreInvalid && <p style={{color:"red"}}>{Nombre}</p>}

      </div>
      <div className="form-group">
        <label htmlFor="Fecha">Fecha de Nacimiento</label>
        <div className="input-group">
            <input type="date" className="form-control" onChange={e => handleChange(e)} id="FechaN" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="telf">Telefono</label>
        <input 
         type="text" 
         className={`form-control ${TelfInvalid ? 'is-invalid' : 'form-control'}`} 
         onChange={e => handleChange(e)} id="telf" />
         {TelfInvalid && <p style={{color:"red"}}>{Telf}</p>}
      </div>
      <label>Agregar Viaje</label>
                <select onChange={e => capturar(e)} className="form-control">
                <option value="0" selected disabled>Seleccione</option>
                {Viajes.map((elem,index) => 
                        <option key={index} value={elem.id}>{elem.codigo_viaje+' - '+elem.origen+' - '+elem.destino}</option>
                        )}
                </select>
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
                            {Datos.viajes.map((elem,index) => 
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
                         Registrar
                         </button>
                        }
      <Link to="/" href="#" className="btn btn-default">Atras</Link>

    </div>
  </form>
</div>

        </>
    )
}

export default Registro
