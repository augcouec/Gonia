const mongoist = require("mongoist");
require("dotenv").config();

const connectionString = process.env.DATABASE_URI;

module.exports = mongoist(connectionString);
