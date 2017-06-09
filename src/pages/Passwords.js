'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
import Treeview from 'metal-treeview';

const {ipcRenderer} = require('electron');

import templates from './Passwords.soy';

class Passwords extends Component {
	created() {
		ipcRenderer.on('allEntriesRetrieved', (event, entries) => {
			this.entries = entries;

			let entriesDictionary = {};

			entries.forEach((entry) => {
				entriesDictionary[entry.uuid.id] = entry;
			});

			this.entriesDictionary = entriesDictionary;
		});

		ipcRenderer.send('getAllEntries');
	}

	_selectEntryHandler(event) {
		let entryId = event.delegateTarget.getAttribute('data-entryId');

		let entry = this.entriesDictionary[entryId];

		this.selectedEntry = entry;
	}
}

Soy.register(Passwords, templates);

Passwords.STATE = {
	entries: {
		value: []
	},

	entriesDictionary: {},

	selectedEntry: {}
}

export default Passwords;
