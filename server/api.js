function createEntry(data) {
	console.log('createEntry');
}

function deleteEntry(id) {
	console.log('deleteEntry');
}

function getAllEntries() {
	console.log('getAllEntries');
}

function updateEntry(id, data) {
	console.log('updateEntry');
}

function search(keywords) {
	console.log('search');
}

function open(databaseFile, databasePassword) {
	console.log('databaseFile: ', databaseFile);
	console.log('databasePassword: ', databasePassword);
}

function close() {
	console.log('close');
}

module.exports = {
	createEntry,
	deleteEntry,
	getAllEntries,
	updateEntry,
	search,
	open,
	close,
};
