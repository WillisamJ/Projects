// Import necessary modules from Sequelize
import { DataTypes } from 'sequelize';  // Import DataTypes for defining column types
import sequelize from '../config/database.js';  // Import the sequelize instance for DB connection

// Define the 'Transaction' model, representing the transactions table in the database
const Transaction = sequelize.define('Transaction.js', {  // Define the model, 'Transaction.js' will be the table name
  // Define the 'id' column (primary key) for the transaction
  id: {
    type: DataTypes.INTEGER,  // Column type: INTEGER (for whole numbers)
    primaryKey: true,  // This column is the primary key of the table
    autoIncrement: true  // Automatically increment the value for new records (unique for each transaction)
  },

  // Define the 'amount' column for the transaction amount
  amount: {
    type: DataTypes.DECIMAL,  // Column type: DECIMAL (for precise monetary values)
    allowNull: false  // This column cannot be null (must have a value)
  },

  // Define the 'type' column for specifying whether the transaction is a 'Credit' or 'Debit'
  type: {
    type: DataTypes.ENUM('Credit', 'Debit'),  // Column type: ENUM (only allows specific values: 'Credit' or 'Debit')
    allowNull: false  // This column cannot be null (must have a value)
  },

  // Define the 'description' column for additional information about the transaction
  description: {
    type: DataTypes.STRING,  // Column type: STRING (for text)
    allowNull: false  // This column cannot be null (must have a value)
  },

  // Define the 'user_id' column to associate a transaction with a user
  user_id: {
    type: DataTypes.INTEGER,  // Column type: INTEGER (for whole numbers, representing the user's ID)
    allowNull: false,  // This column cannot be null (must have a value)
    references: {
      model: 'users',  // This defines a foreign key relationship with the 'users' table
      key: 'id',  // The 'user_id' column in 'transactions' will reference the 'id' column in the 'users' table
    },
  },
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt columns to track when records are created or updated
});

// Export the 'Transaction' model to be used in other parts of the application
export default Transaction;
