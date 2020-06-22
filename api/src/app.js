const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(8000, () => {
  console.log("App listening on port 8000!");
});
