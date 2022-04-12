import React from 'react';
import ReactDOM from 'react-dom';
import Listados from './component/Listados_Clientes_viajeros/Listados';
import Menu from './component/navbar/menu';
class App extends React.Component {

	render(){
		return (
			<Menu/>
			//<Listados/>
			);
	}
}


ReactDOM.render(<App/>,document.getElementById('root'))