import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import Menu from './component/navbar/menu';

class App extends React.Component {

	render(){
		return (
			<React.StrictMode>
			<BrowserRouter>
			<Menu/>
			</BrowserRouter>
			</React.StrictMode>
			);
	}
}


ReactDOM.render(<App/>,document.getElementById('root'))