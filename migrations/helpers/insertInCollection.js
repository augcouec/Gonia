const db = require("../../src/db");

/**
 * Insert data in a collection
 * @param {String} collectionName The name of the collection in which to insert
 * @param {Array} data The data to insert
 * @returns {Promise}
 */
module.exports = (collectionName, data) => {
  return new Promise((resolve, reject) => {
    console.info(`🔄 Populating collection \`${collectionName}\`...`);
    db.collection(collectionName)
      .insertMany(data)
      .then(() => {
        console.info(`✅ Collection \`${collectionName}\` has been populated.`);
        resolve();
      })
      .catch((error) => {
        console.info(
          `❌ An error occured while populating collection \`${collectionName}\`.`
        );
        reject(error);
      });
  });
};
