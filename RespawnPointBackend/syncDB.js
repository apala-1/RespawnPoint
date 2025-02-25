const { User } = require('./models'); // Adjust the path to where your models are

User.sync({ force: true })  // Recreate the table
  .then(() => {
    console.log("User table created!");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });
