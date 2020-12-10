const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const config = require("../config/config.json").dev;

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(
  // Schema Name
  config.datasource.database,
  // Username
  config.datasource.username,
  // Password
  config.datasource.password, 
  {
    // Database Host
    host: config.datasource.host,
    // Database Driver
    dialect: config.datasource.driver,
    // Database Pool Configure
    pool: config.datasource.pool
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const modelDefiners = [
  require('./models/todo.model'),
  require('./models/user.model'),
  require('./models/authority.model'),
  require('./models/userAuthority.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;