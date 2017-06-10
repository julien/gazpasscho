'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';

const {ipcRenderer} = require('electron');

import templates from './Passwords.soy';

class Passwords extends Component {
	created() {
		ipcRenderer.on('allEntriesRetrieved', this.setEntries.bind(this));

		ipcRenderer.on('entryDeleted', this.setEntries.bind(this));

		ipcRenderer.send('getAllEntries');
	}

	setEntries(event, entries) {
		this.entries = entries;

		let entriesDictionary = {};

		entries.forEach((entry) => {
			entriesDictionary[entry.uuid.id] = entry;
		});

		this.entriesDictionary = entriesDictionary;

	}

	_deleteEntryHandler(event) {
		ipcRenderer.send('deleteEntry', {id:this.selectedEntry.uuid.id});
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
