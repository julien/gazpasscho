const ipcMain = require('electron').ipcMain;
const api = require('./api');

ipcMain.on('createEntry', (event, { data }) => {
	api.createEntry(data);
});

ipcMain.on('deleteEntry', (event, { id }) => {
	api.deleteEntry(id);
});

ipcMain.on('getAllEntries', event => {
	api.getAllEntries();
});

ipcMain.on('updateEntry', (event, { id, data }) => {
	api.updateEntry(id, data);
});

ipcMain.on('search', (event, { keywords }) => {
	api.search(keywords);
});

ipcMain.on('open', (event, { databaseFile, databasePassword }) => {
	api.open(databaseFile, databasePassword);
});

ipcMain.on('close', event => {
	api.close();
});
