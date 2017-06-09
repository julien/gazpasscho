const Configstore = require('configStore');

const {Database, Entry} = require('./database');
const pkg = require('../package.json');

const conf = new Configstore(pkg.name);

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

  const newEntry = db.addEntry({title, userName, password, url});

  return db.save().then(() => newEntry);
}

function deleteEntry(id) {
  console.log('deleteEntry');
  console.log('id: ', id);

  if (!db) throw new Error('Database is not initialized.');

  db.deleteEntry(id);

  return save();
}

function doesDBExist() {
  if (!config.has('databaseFile') || !config.has('databasePassword')) {
    return Promise.reject(false);
  }

  const databaseFile = conf.get('databaseFile');
  const databasePassword = conf.get('databasePassword');

  return open(databaseFile, databasePassword);
}

function getAllEntries() {
  console.log('getAllEntries');

  if (!db) throw new Error('Database is not initialized.');

  return Promise.resolve(db.findEntries());
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
  db = new Database(databaseFile);

  return db.open(databasePassword)
    .then(() => {
      conf.set('databaseFile', databaseFile);
      conf.set('databasePassword', databasePassword);
    });
}

function close() {
  if (!db) throw new Error('Database is not initialized.');

  console.log('close');

  db.close();

  conf.delete('databaseFile');
  conf.delete('databasePassword');

  return Promise.resolve('Database closed');
}

module.exports = {
  createEntry,
  deleteEntry,
  doesDBExist,
  getAllEntries,
  updateEntry,
  search,
  open,
  close,
};
