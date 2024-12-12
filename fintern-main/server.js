// Import the necessary models and configuration
import Transaction from './models/Transaction.js';  // Import the Transaction model
import User from  './models/User.js';                // Import the User model
import sequelize from './config/database.js';       // Import sequelize instance for DB connection

try {
    // Attempt to authenticate and connect to the database
    await sequelize.authenticate();  // Test the database connection
    console.log ('Database connected');  // Log success message if connection is successful

    // Synchronize the User and Transaction models with the database
    await User.sync();  // Sync the User model (create the table if it doesn't exist)
    await Transaction.sync();  // Sync the Transaction model (create the table if it doesn't exist)
    console.log ('Database synchronized');  // Log success message if synchronization is successful

} catch (error) {
    // If any error occurs during authentication or synchronization
    console.log('Error connecting to database:', error);  // Log the error message
}

