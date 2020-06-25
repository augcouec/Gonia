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
      const statusTypes = ["pending", "todo", "doing", "done", "finished"];
      const productCategories = ["Bouteille", "Bureau", "Chaise"];
      const productDimensionUnit = ["Millimètres", "Pouces"];
      const materials = ["Bois", "Carbon", "Verre", "Tissu"];
      const contactModes = ["onEachStep", "onFinished", "none"];

      for (i = 0; i < number; i++) {
        const status =
          statusTypes[Math.floor(Math.random() * statusTypes.length)];
        const clientId =
          clientUsers[Math.floor(Math.random() * clientUsers.length)]._id;
        let adminId = null;
        let infographisteId = null;

        if (status === "todo") {
          adminId =
            adminUsers[Math.floor(Math.random() * adminUsers.length)]._id;
        }

        if (status === "doing" || status === "done" || status === "finished") {
          adminId =
            adminUsers[Math.floor(Math.random() * adminUsers.length)]._id;
          infographisteId =
            infographisteUsers[
              Math.floor(Math.random() * infographisteUsers.length)
            ]._id;
        }

        projects.push({
          creationDate: new Date(),
          status,
          clientId,
          adminId,
          infographisteId,
          product: {
            name: chance.word(),
            sku: `AA00${i + 1}`,
            category:
              productCategories[
                Math.floor(Math.random() * productCategories.length)
              ],
            dimensions: {
              unit:
                productDimensionUnit[
                  Math.floor(Math.random() * productDimensionUnit.length)
                ],
              length: Math.floor(Math.random() * 1000),
              width: Math.floor(Math.random() * 1000),
              depth: Math.floor(Math.random() * 1000),
            },
            material: materials[Math.floor(Math.random() * materials.length)],
            url: "www.google.fr",
            details: chance.sentence(),
            contactMode:
              contactModes[Math.floor(Math.random() * contactModes.length)],
          },
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
