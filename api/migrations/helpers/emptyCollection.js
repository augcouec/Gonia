const db = require("../../src/db");

/**
 * Empty a collection
 * @param {String} collectionName
 * @returns {Promise}
 */
module.exports = (collectionName) => {
  return new Promise((resolve, reject) => {
    console.info(`🔄 Emptying collection \`${collectionName}\`...`);
    db.collection(collectionName)
      .remove({})
      .then(() => {
        console.info(`✅ Collection \`${collectionName}\` has been emptied.`);
        resolve();
      })
      .catch((error) => {
        console.info(
          `❌ An error occured while emptying collection \`${collectionName}\`.`
        );
        reject(error);
      });
  });
};
