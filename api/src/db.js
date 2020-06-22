const mongoist = require("mongoist");
const settings = require("../settings");

module.exports = mongoist(settings.database.connectionURI);
