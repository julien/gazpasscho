const ipcMain = require('electron').ipcMain;
const api = require('./api');

ipcMain.on('createEntry', (event, arg) => {
	api.createEntry();
});

ipcMain.on('deleteEntry', (event, arg) => {
	api.deleteEntry();
});

ipcMain.on('getAllEntries', (event, arg) => {
	api.getAllEntries();
});

ipcMain.on('updateEntry', (event, arg) => {
	api.updateEntry();
});

ipcMain.on('search', (event, arg) => {
	api.search();
});

ipcMain.on('open', (event, { databaseFile, databasePassword }) => {
	api.open(databaseFile, databasePassword);
});

ipcMain.on('close', (event, arg) => {
	api.close();
});
