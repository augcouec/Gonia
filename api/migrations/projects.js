const chance = require("chance").Chance();
const db = require("../src/db");
const emptyCollection = require("./helpers/emptyCollection");
const insertInCollection = require("./helpers/insertInCollection");

/**
 *
 * @param {Number} number Number of documents to generate
 * @returns {Promise}
 */
const generateProjects = (number) => {
  return new Promise((resolve) => {
    db.users.find({}).then((users) => {
      const projects = [];
      const adminUsers = users.filter((user) => user.role === "admin");
      const clientUsers = users.filter((user) => user.role === "client");
      const infographisteUsers = users.filter(
        (user) => user.role === "infographiste"
      );
      const statusTypes = ["pending", "todo", "doing", "done"];

      for (i = 0; i < number; i++) {
        const status =
          statusTypes[Math.floor(Math.random() * statusTypes.length)];
        const client =
          clientUsers[Math.floor(Math.random() * clientUsers.length)];
        let admin = null;
        let infographiste = null;

        if (status === "todo") {
          admin = adminUsers[Math.floor(Math.random() * adminUsers.length)];
        }

        if (status === "doing" || status === "done") {
          admin = adminUsers[Math.floor(Math.random() * adminUsers.length)];
          infographiste =
            infographisteUsers[
              Math.floor(Math.random() * infographisteUsers.length)
            ];
        }

        projects.push({
          status,
          client,
          admin,
          infographiste,
        });
      }
      resolve(projects);
    });
  });
};

/**
 *
 * @param {Number} number Number of documents to insert
 * @param {Boolean} empty Empty the collection before inserting new documents
 * @returns {Promise}
 */
module.exports = (number, empty = false) => {
  return new Promise((resolve, reject) => {
    generateProjects(number).then((projects) => {
      if (empty) {
        emptyCollection("projects")
          .then(() => {
            insertInCollection("projects", projects)
              .then(() => {
                resolve();
              })
              .catch((errorInserting) => {
                reject(errorInserting);
              });
          })
          .catch((errorEmptyCollection) => {
            reject(errorEmptyCollection);
          });
      } else {
        insertInCollection("projects", projects)
          .then(() => {
            resolve();
          })
          .catch((errorInserting) => {
            reject(errorInserting);
          });
      }
    });
  });
};
