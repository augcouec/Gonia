const db = require("../db");
const mongoist = require("mongoist");
const async = require("async");

exports.getProject = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };

  db.projects
    .findOne(query)
    .then((project) => {
      if (!project) {
        res.sendStatus(204);
        return;
      }
      // Join client
      db.users.findOne({ _id: project.clientId }).then((client) => {
        delete project.clientId;
        project.client = client;

        // Join admin
        db.users.findOne({ _id: project.adminId }).then((admin) => {
          delete project.adminId;
          if (admin) {
            project.admin = admin;
          }

          // Join infographiste
          db.users
            .findOne({ _id: project.infographisteId })
            .then((infographiste) => {
              delete project.infographisteId;
              if (infographiste) {
                project.infographiste = infographiste;
              }
              res.status(200).send(project);
            });
        });
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

exports.getProjects = (req, res) => {
  const skip = req.query.skip ? parseInt(req.query.skip, 10) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;

  const query = {};
  if (req.query.clientId) {
    query.clientId = mongoist.ObjectId(req.query.clientId);
  }
  if (req.query.adminId) {
    query.adminId = mongoist.ObjectId(req.query.adminId);
  }
  if (req.query.infographisteId) {
    query.infographisteId = mongoist.ObjectId(req.query.infographisteId);
  }

  db.projects
    .findAsCursor(query, null, { skip, limit })
    .sort({ creationDate: -1 })
    .toArray()
    .then((projects) => {
      if (!projects) {
        res.sendStatus(204);
        return;
      }
      const results = [];

      async.eachSeries(
        projects,
        (project, next) => {
          // Join client
          db.users.findOne({ _id: project.clientId }).then((client) => {
            delete project.clientId;
            project.client = client;

            // Join admin
            db.users.findOne({ _id: project.adminId }).then((admin) => {
              delete project.adminId;
              if (admin) {
                project.admin = admin;
              }

              // Join infographiste
              db.users
                .findOne({ _id: project.infographisteId })
                .then((infographiste) => {
                  delete project.infographisteId;
                  if (infographiste) {
                    project.infographiste = infographiste;
                  }
                  results.push(project);
                  next();
                });
            });
          });
        },
        () => {
          res.status(200).send(results);
        }
      );
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
  const project = req.body;
  project.clientId = mongoist.ObjectId(project.clientId);
  project.creationDate = new Date();
  db.projects
    .insertOne(project)
    .then((project) => {
      if (!project) {
        res.sendStatus(400);
        return;
      }
      res.status(201).send(project.id);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
};

exports.updateProject = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };
  const project = req.body;
  project.updateDate = new Date();
  db.projects
    .update(query, { $set: project })
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

exports.deleteProject = (req, res) => {
  const query = { _id: mongoist.ObjectId(req.params.id) };
  db.projects
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
