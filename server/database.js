// *** See examples of usage at the bottom ***

const fs = require('fs');
const kp = require('kdbxweb');
const promisify = require('es6-promisify');

const readFile = promisify(fs.readFile);
const Kdbx = kp.Kdbx;
const Credentials = kp.Credentials;
const ProtectedValue = kp.ProtectedValue;
const Consts = kp.Consts;
const ByteUtils = kp.ByteUtils;

class Database {
	constructor(path) {
		this._path = path;
		this._db = null;
		this._defaultGroup = null;
	}

	/**
 	 * @return a Promise which resolves to the Database when the file is open
	 */
	open(password) {
		return readFile(this._path)
			.then(data =>
				Kdbx.load(
					data.buffer,
					new Credentials(ProtectedValue.fromString(password))
				)
			)
			.then(db => {
				this._db = db;
				this._defaultGroup = db.getDefaultGroup();
			})
			.then(() => this);
	}

	/**
	 * Save database to its file
	 * @return a Promise which resolves to the Database when the file is saved
	 */
	save() {
		return this._db
			.save()
			.then(data => fs.writeFile(this._path, new Uint8Array(data)))
			.then(() => this);
	}

	/**
	 * @param an Entry or a raw Object describing the informed fields
	 * @return the newly created Entry (with its UUID informed)
	 * @throws if the entry already exists (it has its UUID field set)
	 */
	addEntry(entry) {
		if (entry.uuid != null) {
			throw new Error(`Trying to add an already existing entry: ${entry.uuid}`);
		}

		// Clone entry (this coerces Objects and duplicates Entry's)
		entry = new Entry(entry);

		const dbEntry = this._db.createEntry(this._defaultGroup);
		entry.uuid = dbEntry.uuid;

		this.updateEntry(entry);

		return entry;
	}

	/**
	 * Get entry by UUID
	 * @return the Entry
	 * @throws if the entry does not exist
	 */
	getEntry(uuid) {
		return Entry._fromDbEntry(this._getDbEntry(uuid));
	}

	/**
	 * Find all entries matching keywords. If keywords is null or '', all entries
	 * are returned.
	 * @return an array of Entry objects
	 */
	findEntries(keywords = '') {
		var dbEntries;

		if (keywords == null || keywords == '') {
			dbEntries = this._defaultGroup.entries;
		} else {
			dbEntries = this._defaultGroup.entries.filter(
				entry =>
					entry.fields.Title.indexOf(keywords) != -1 ||
					entry.fields.URL.indexOf(keywords) != -1 ||
					entry.fields.UserName.indexOf(keywords) != -1
			);
		}

		return dbEntries.map(dbEntry => Entry._fromDbEntry(dbEntry));
	}

	/**
   *
	 * @throws if the entry does not exist
	 */
	updateEntry(entry) {
		if (entry.uuid == null) {
			throw new Error('Trying to update an entry with no UUID');
		}

		var dbEntry = this._getDbEntry(entry.uuid);

		dbEntry.fields.Title = entry.title;
		dbEntry.icon = entry.icon;
		dbEntry.fields.URL = entry.url;
		dbEntry.fields.UserName = entry.userName;
		dbEntry.fields.Password = ProtectedValue.fromString(entry.password);
	}

	/**
	 * Deletes an existing entry given the Entry or its UUID
	 * @throws if the entry does not exist
	 */
	deleteEntry(entryOrUuid) {
		var uuid = entryOrUuid.uuid || entryOrUuid;

		this._db.remove(this._getDbEntry(uuid));
	}

	dump() {
		new DatabaseDumper(this._db).dump();
	}

	/**
	 * @throws if the entry does not exist
	 */
	_getDbEntry(uuid) {
		const dbEntry = this._defaultGroup.entries.find(
			entry => entry.uuid.id == uuid
		);

		if (dbEntry === undefined) {
			throw new Error(`Entry not found: ${uuid}`);
		}

		return dbEntry;
	}
}

class Entry {
	static _fromDbEntry(dbEntry) {
		return new Entry({
			uuid: dbEntry.uuid,
			title: dbEntry.fields.Title,
			icon: dbEntry.icon,
			url: dbEntry.fields.URL,
			userName: dbEntry.fields.UserName,
			password: dbEntry.fields.Password.getText(),
		});
	}

	constructor(
		{
			uuid = null,
			title = '',
			icon = 0,
			url = '',
			userName = '',
			password = '',
		} = {}
	) {
		this.uuid = uuid;
		this.title = title;
		this.icon = icon;
		this.url = url;
		this.userName = userName;
		this.password = password;
	}
}

class DatabaseDumper {
	constructor(db) {
		this._db = db;
	}

	dump() {
		this._dumpHeader();
		this._dumpMeta();
		this._dumpGroup(0, this._db.getDefaultGroup());
	}

	_dumpHeader() {
		const header = this._db.header;
		console.log(this._db);
		console.log('# Header:');
		console.log('  Version:', `${header.versionMajor}.${header.versionMinor}`);
		console.log(
			'  Compression:',
			this._find(Consts.CompressionAlgorithm, header.compression)
		);
		console.log(
			'  Cipher:',
			this._find(Consts.CipherId, header.dataCipherUuid)
		);
		console.log('  Encryption rounds:', `${header.keyEncryptionRounds}`);
		console.log(
			'  Stream cipher:',
			this._find(Consts.CrsAlgorithm, header.crsAlgorithm)
		);
	}

	_dumpMeta() {
		const meta = this._db.meta;

		console.log('# Meta:');
		console.log('  Generator:', `${meta.generator}`);
	}

	_dumpGroup(level, group) {
		let indent = level == 0 ? '' : ' '.repeat(level * 2);

		console.log(indent + `* Group '${group.name}':`);
		console.log(indent + '    UUID:', `${group.uuid}`);
		console.log(indent + '    Icon:', `${group.icon}`);
		console.log(indent + '    Custom icon:', `${group.customIcon}`);
		console.log(indent + '    Notes:', `${group.notes}`);

		group.groups.forEach(group => this._dumpGroup(level + 1, group));
		group.entries.forEach(entry => this._dumpEntry(level + 1, entry));
	}

	_dumpEntry(level, entry) {
		let indent = level == 0 ? '' : ' '.repeat(level * 2);

		console.log(indent + `· Entry '${entry.fields.Title}':`);
		console.log(indent + '    UUID:', `${entry.uuid}`);
		console.log(indent + '    Icon:', `${entry.icon}`);
		console.log(indent + '    Custom icon:', `${entry.customIcon}`);
		console.log(indent + '    Notes:', `${entry.fields.Notes}`);
		console.log(indent + '    URL:', `${entry.fields.URL}`);
		console.log(indent + '    User name:', `${entry.fields.UserName}`);
		console.log(indent + '    Password:', `${entry.fields.Password.getText()}`);
	}

	_find(where, what) {
		return Object.keys(where).find(key => where[key] == what);
	}
}

module.exports = {
	Database: Database,
	Entry: Entry,
};

// Usage examples:

// *** Open database
// var db = new Database('sample-keepass-db.kdbx');
// db.open('password').then(() => ...);

// *** Create an entry
// db.addEntry({
// 	title: 'My entry',
// 	userName: 'me',
// 	password: 'secret',
// 	url: 'https://www.google.com',
// });

// *** Get an entry
// var entry = db.getEntry('Bkxzh2wTW6YNhqoOeYUzww==');

// *** Delete an entry
// db.deleteEntry('Bkxzh2wTW6YNhqoOeYUzww==');

// *** Update an entry
// var entry = db.getEntry('BokXdYe/rFGWfAKxk/Y27A==');
// entry.title = 'New title';
// db.updateEntry(entry);

// *** Get all entries
// var entries = db.findEntries();

// *** Search entries containing 'google' in the title, user or URL
// var entries = db.findEntries('google');
