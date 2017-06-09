function createEntry(data) {
	console.log('createEntry');
	console.log('data: ', data);
}

function deleteEntry(id) {
	console.log('deleteEntry');
	console.log('id: ', id);
}

function getAllEntries() {
	console.log('getAllEntries');
}

function updateEntry(id, data) {
	console.log('updateEntry');
	console.log('id: ', id);
	console.log('data: ', data);
}

function search(keywords) {
	console.log('search');
	console.log('keywords: ', keywords);
}

function open(databaseFile, databasePassword) {
	console.log('open');
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
