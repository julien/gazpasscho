const path = require('path');
const url = require('url');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;

module.exports = function createWindow() {
	// Create the browser window.
	let mainWindow = new BrowserWindow({ width: 1280, height: 800 });

	// and load the index.html of the app.
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, '..', 'index.html'),
			protocol: 'file:',
			slashes: true,
		})
	);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
};
