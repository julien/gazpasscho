'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
const {ipcRenderer} = require('electron');

import templates from './Passwords.soy';

class Passwords extends Component {
	created() {
		ipcRenderer.on('allEntriesRetrieved', (event, entries) => {
			entries = entries.map((entry) => {
				entry.name = entry.title;
				return entry;
			});

			this.entries = entries;
		});

		ipcRenderer.send('getAllEntries');
	}
}

Soy.register(Passwords, templates);

Passwords.STATE = {
	entries: {
		value: []
	}
}

export default Passwords;
