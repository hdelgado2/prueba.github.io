import React from 'react'

const Editar = (props) => {
    console.log(props);
    return (
        <>
          <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Editar Clientes</h3>
            </div>
            <form role="form">
                <div className="card-body">
                <div className="form-group">
                    <label htmlFor="ced">Cedula</label>
                    <input type="text" id="ced" className="form-control" placeholder="Ingresar Cedula" />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" id="nombre" placeholder="Ingresar Nombre" />
                </div>
                <div className="form-group">
                    <label htmlFor="Fecha">Fecha de Nacimiento</label>
                    <div className="input-group">
                        <input type="date" className="form-control" id="FechaN" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="telf">Telefono</label>
                    <input type="text" className="form-control" id="telf" />
                </div>
                </div>
                <div className="card-footer">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>  
        </>
    )
}

export default Editar
