import React from 'react'

const Menu = () => {
    return (
<>
<div className="container">
  <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
    <div className="container">
      <a href="index3.html" className="navbar-brand">
          <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      
      <div className="collapse navbar-collapse order-3" id="navbarCollapse">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/" className="nav-link">Listado de Viajes</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">Registro</a>
          </li>
        
        </ul>
      </div>
    </div>
  </nav>
    <br></br>
    <div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Lista de Viajes</h3>
        <div className="card-tools">
          <div className="input-group input-group-sm" style={{width: 150}}>
            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body table-responsive p-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>183</td>
              <td>John Doe</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-success">Approved</span></td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
            <tr>
              <td>219</td>
              <td>Alexander Pierce</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-warning">Pending</span></td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
            <tr>
              <td>657</td>
              <td>Bob Doe</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-primary">Approved</span></td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
            <tr>
              <td>175</td>
              <td>Mike Doe</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-danger">Denied</span></td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
</div>
    </div>
  

</>
    )
}


export default Menu
