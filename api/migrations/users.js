const chance = require("chance").Chance();
const emptyCollection = require("./helpers/emptyCollection");
const insertInCollection = require("./helpers/insertInCollection");

/**
 *
 * @param {Number} number Number of documents to generate
 * @returns {Array}
 */
const generateUsers = (number) => {
  const users = [];
  const roles = ["admin", "client", "infographiste"];

  for (i = 0; i < number; i++) {
    users.push({
      role: roles[Math.floor(Math.random() * roles.length)],
    });
  }

  return users;
};

/**
 *
 * @param {Number} number Number of documents to insert
 * @param {Boolean} empty Empty the collection before inserting new documents
 * @returns {Promise}
 */
module.exports = (number, empty = false) => {
  return new Promise((resolve, reject) => {
    const users = generateUsers(number);

    if (empty) {
      emptyCollection("users")
        .then(() => {
          insertInCollection("users", users)
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
      insertInCollection("users", users)
        .then(() => {
          resolve();
        })
        .catch((errorInserting) => {
          reject(errorInserting);
        });
    }
  });
};
