const electron = require('electron');
const api = require('./api');
const getWindow = require('./window');

const app = electron.app;
const ipcMain = electron.ipcMain;

const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

let menu;

const appMenuItem = new MenuItem({
	label: app.getName(),
	submenu: [
		{ role: 'about' },
		{ type: 'separator' },
		{ role: 'services', submenu: [] },
		{ type: 'separator' },
		{ role: 'hide' },
		{ role: 'hideothers' },
		{ role: 'unhide' },
		{ type: 'separator' },
		{ role: 'quit' },
	],
});

const fileMenuItem = new MenuItem({
	label: 'File',
	submenu: [
		{
			accelerator: 'Command+N',
			click: () => {
				getWindow().webContents.send('requestCreateEntry');
			},
			label: 'Create Entry'
		}
	],
});

const viewMenuItem = new MenuItem({
	label: 'View',
	submenu: [
		{ role: 'reload' },
		{ role: 'forcereload' },
		{ role: 'toggledevtools' },
		{ type: 'separator' },
		{ role: 'resetzoom' },
		{ role: 'zoomin' },
		{ role: 'zoomout' },
		{ type: 'separator' },
		{ role: 'togglefullscreen' },
	],
});

const windowMenuItem = new MenuItem({
	role: 'window',
	submenu: [{ role: 'minimize' }, { role: 'close' }],
});

module.exports = function createMenu() {
	menu = new Menu();

	menu.append(appMenuItem);
	menu.append(fileMenuItem);
	menu.append(viewMenuItem);
	menu.append(windowMenuItem);

	Menu.setApplicationMenu(menu);
};
