const mongoist = require("mongoist");
const settings = require("../settings");

const connectionString =
  process.env.DATABASE_URI || settings.database.connectionURI;

module.exports = mongoist(connectionString);
