const db = require("../db");
const mongoist = require("mongoist");

exports.getProject = (req, res) => {
  res.send({});
};

exports.getProjects = (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 100;

  db.projects
    .find({}, null, { skip, limit })
    .then((projects) => {
      if (!projects) {
        res.sendStatus(204);
        return;
      }
      res.status(200).send(projects);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.getProjectsCount = (req, res) => {
  db.projects
    .count()
    .then((count) => {
      res.status(200).send({ count });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.createProject = (req, res) => {
  res.send({});
};

exports.updateProject = (req, res) => {
  res.send({});
};

exports.deleteProject = (req, res) => {
  res.send({});
};
