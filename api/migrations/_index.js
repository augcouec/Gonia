const populateUsersCollection = require("./users");
const populateProjectsCollection = require("./projects");

populateUsersCollection(3, true)
  .then(() => {
    populateProjectsCollection(1000, true)
      .then(() => {
        process.exit(0);
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
