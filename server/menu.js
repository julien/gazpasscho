const electron = require('electron');

const Menu = electron.Menu;

module.exports = function createMenu() {
	let menu = new Menu();

	Menu.setApplicationMenu(menu);

	console.log(menu);
}