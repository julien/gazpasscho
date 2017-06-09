const { Database, Entry } = require('./database');

let db;

function createEntry(title, userName, password, url) {
	console.log('createEntry');
	console.log('title: ', title);
	console.log('username: ', userName);
	console.log('password: ', password);
	console.log('url: ', url);

	if (!db) return Promise.reject(new Error('Database is not initialized.'));
	if (!title) return Promise.reject(new Error('A title is required.'));
	if (!userName) return Promise.reject(new Error('A username is required.'));
	if (!password) return Promise.reject(new Error('A password is required.'));
	if (!url) return Promise.reject(new Error('A url is required.'));

	const newEntry = db.addEntry({ title, userName, password, url });

	return db.save().then(() => newEntry);
}

function deleteEntry(id) {
	console.log('deleteEntry');
	console.log('id: ', id);

	if (!db) throw new Error('Database is not initialized.');

	db.deleteEntry(id);

	return save();
}

function getAllEntries() {
	console.log('getAllEntries');

	if (!db) throw new Error('Database is not initialized.');

	return db.findEntries();
}

function updateEntry(id, data) {
	console.log('updateEntry');
	console.log('id: ', id);
	console.log('data: ', data);

	if (!db) throw new Error('Database is not initialized.');

	const entry = Object.assign({}, db.getEntry(id), data);

	db.updateEntry(entry);

	return save().then(() => entry);
}

function search(keywords) {
	console.log('search');
	console.log('keywords: ', keywords);

	if (!db) throw new Error('Database is not initialized.');

	const entries = db.findEntries(keywords);

	return entries;
}

function open(databaseFile, databasePassword) {
	console.log('open');
	console.log('databaseFile: ', databaseFile);
	console.log('databasePassword: ', databasePassword);

	db = new Database(databaseFile);

	return db.open(databasePassword);
}

function close() {
	if (!db) throw new Error('Database is not initialized.');

	console.log('close');

	db.close();

	return Promise.resolve('Database closed');
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
