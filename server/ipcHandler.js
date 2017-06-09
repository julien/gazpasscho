const ipcMain = require('electron').ipcMain;
const api = require('./api');

ipcMain.on('createEntry', (event, arg) => {
	api.createEntry(data);
});

ipcMain.on('deleteEntry', (event, arg) => {
	api.deleteEntry(data);
});

ipcMain.on('getAllEntries', (event, arg) => {
	api.getAllEntries(data);
});

ipcMain.on('updateEntry', (event, arg) => {
	api.updateEntry(data);
});

ipcMain.on('search', (event, arg) => {
	api.search(data);
});

ipcMain.on('open', (event, arg) => {
	api.open(data);
});

ipcMain.on('close', (event, arg) => {
	api.close(data);
});
