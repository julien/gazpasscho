const ipcMain = require('electron').ipcMain;
const api = require('./api');

ipcMain.on('createEntry', (event, { title, userName, password, url }) => {
	api.createEntry(title, userName, password, url)
		then(entry => event.sender.send('entryCreated', entry));
});

ipcMain.on('deleteEntry', (event, { id }) => {
	api.deleteEntry(id)
		.then(() => api.getAllEntries())
		.then(entries => event.sender.send('entryDeleted', entries));
});

ipcMain.on('getAllEntries', event => {
	api.getAllEntries()
		.then(entries => event.sender.send('allEntriesRetrieved', entries));
});

ipcMain.on('updateEntry', (event, { id, data }) => {
	api.updateEntry(id, data)
		.then(entry => event.sender.send('entryUpdated', entry));
});

ipcMain.on('search', (event, { keywords }) => {
	api.search(keywords)
		then(entries => event.sender.send('entriesFound', entries));
});

ipcMain.on('open', (event, { databaseFile, databasePassword }) => {
	api.open(databaseFile, databasePassword)
		then(() => event.sender.send('databaseOpened'));
});

ipcMain.on('close', event => {
	api.close()
		then(() => event.sender.send('databaseClosed'));
});
