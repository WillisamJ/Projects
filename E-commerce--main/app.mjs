// Import required packages
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Sequelize instance using the values from .env file
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASSWORD,  // Database password
  {
    host: process.env.DB_HOST,  // Database host
    dialect: process.env.DB_DIALECT, // Dialect (mysql)
    port: process.env.DB_PORT,      // Port (3306)
  }
);

// Define a sample model (Customers table)
const Customer = sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    unique: true,
  },
  phone_number: {
    type: DataTypes.STRING(15),
  },
  address: {
    type: DataTypes.STRING(50),
  },
  city: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  zip: {
    type: DataTypes.INTEGER(5),
  },
  registration_date: {
    type: DataTypes.DECIMAL,
  },
}, {
  tableName: 'customers',
  timestamps: false, // Disable automatic timestamp fields (createdAt, updatedAt)
});

// Function to sync the model with the database and create sample data
async function syncAndTestConnection() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sync the model (create tables in the database)
    await sequelize.sync({ alter: true });  // 'alter: true' will only update the table structure if necessary, without dropping it
console.log('Models synchronized successfully.');

    // Create a sample customer record
    const newCustomer = await Customer.create({
      first_name: 'Sammy',
      last_name: 'Lakesteady',
      email: 'samsam233@gmail.com',
      phone_number: '2673234021',
      address: '1738 North desk street',
      city: 'Philadelphia',
      state: 'PA',
      zip: 29133,
    });

    console.log('Customer created:', newCustomer.get());

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the function to sync the model and test the connection
syncAndTestConnection();
