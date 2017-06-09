const electron = require("electron");

const Menu = electron.Menu;

let menu;

module.exports = function createMenu() {
	menu = new Menu();

	Menu.setApplicationMenu(menu);

	console.log(menu);
};
