'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
const {ipcRenderer} = require('electron')

import templates from './Home.soy';

class Home extends Component {
	_submitHandler(event) {
		event.preventDefault();

		let form = event.delegateTarget;

		let databaseFile = form.querySelector('#databaseFile').value;

		let databasePassword = form.querySelector('#databasePassword').value;

		ipcRenderer.send(
			'open',
			{
				databaseFile: databaseFile,
				databasePassword: databasePassword
			}
		);
	}
}

Soy.register(Home, templates);

export default Home;
