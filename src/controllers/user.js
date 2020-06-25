const db = require("../db");
const mongoist = require("mongoist");

exports.getUser = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };
  db.users
    .findOne(query)
    .then((user) => {
      if (!user) {
        res.sendStatus(204);
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.getUsers = (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;

  const query = {};

  if (req.query.role) {
    query.role = req.query.role;
  }

  db.users
    .find(query, null, { skip, limit })
    .then((users) => {
      if (!users) {
        res.sendStatus(204);
        return;
      }
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.getUsersCount = (req, res) => {
  db.users
    .count()
    .then((count) => {
      res.send({ count });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.createUser = (req, res) => {
  const user = req.body;
  db.users
    .insertOne(user)
    .then((user) => {
      if (!user) {
        res.sendStatus(400);
        return;
      }
      res.status(201).send(user.id);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.updateUser = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };
  const user = req.body;
  db.users
    .update(query, { $set: user })
    .then((update) => {
      if (!update) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.deleteUser = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };
  db.users
    .remove(query)
    .then((remove) => {
      if (!remove) {
        res.sendStatus(400);
        return;
      }
      res.sendStatus(200);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
