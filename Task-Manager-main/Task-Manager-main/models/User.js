// Import necessary modules from Sequelize
import { DataTypes } from 'sequelize';  // DataTypes is used to define column types
import sequelize from '../config/database.js';  // Import the sequelize instance for DB connection

// Define the 'User' model, representing the users table in the database
const User = sequelize.define('User.js', {  // Define the model, 'User.js' will be the name of the table
  // Define the 'name' column in the 'User' table
  name: {
    type: DataTypes.STRING,  // Column type: STRING (for text)
    allowNull: false  // This column cannot be null (must have a value)
  },

  // Define the 'id' column (primary key) in the 'User' table
  id: {
    type: DataTypes.INTEGER,  // Column type: INTEGER (for whole numbers)
    primaryKey: true,  // This column is the primary key of the table
    autoIncrement: true  // Automatically increment the value for new records (unique for each user)
  },

  // Define the 'username' column
  username: {
    type: DataTypes.STRING,  // Column type: STRING (for text)
    allowNull: false,  // This column cannot be null (must have a value)
    unique: true  // The username must be unique across all users
  },

  // Define the 'email' column
  email: {
    type: DataTypes.STRING,  // Column type: STRING (for text)
    allowNull: false,  // This column cannot be null (must have a value)
    unique: true,  // The email must be unique across all users
    validate: {
      isEmail: true,  // This validates that the value entered is a valid email format
    },
  },

  // Define the 'password_hash' column (for storing encrypted passwords)
  password_hash: {
    type: DataTypes.STRING,  // Column type: STRING (for text)
    allowNull: false,  // This column cannot be null (must have a value)
    unique: true,  // The password hash must be unique across all users
  },

  // Define the 'balance' column (for the user's balance)
  balance: {
    type: DataTypes.DECIMAL(10, 2),  // Column type: DECIMAL (for precise values, here with 2 decimal places)
    defaultValue: 0.00,  // Default value is 0.00 if not specified
  },
},
{
  timestamps: true  // Automatically add createdAt and updatedAt columns to track when records are created or updated
});

// Export the 'User' model to be used in other parts of the application
export default User;
