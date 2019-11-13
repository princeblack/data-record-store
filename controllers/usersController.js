const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

exports.getUsers = (req, res, next) => {
  const users = db.get('users').value();
  res.status(200).send(users);
};

exports.addUser = (req, res, next) => {
  const user = req.body;
  db.get('users')
    .push(user)
    .last()
    .assign({ id: Date.now().toString() })
    .write();

  res.status(200).send(user);
};

exports.getUser = (req, res, next) => {
  const { id } = req.params;
  const user = db
    .get('users')
    .find({ id })
    .value();

  res.status(200).send(user);
};

exports.deleteUser = (req, res, next) => {
  const { id } = req.params;
  const user = db
    .get('users')
    .remove({ id })
    .write();

  res.status(200).send(user);
};

exports.updateUser = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const user = db
    .get('users')
    .find({ id })
    .assign(data)
    .write();

  res.status(200).send(user);
};