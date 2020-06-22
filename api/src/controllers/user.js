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

  db.users
    .find({}, null, { skip, limit })
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
  res.send({});
};

exports.updateUser = (req, res) => {
  res.send({});
};

exports.deleteUser = (req, res) => {
  res.send({});
};
