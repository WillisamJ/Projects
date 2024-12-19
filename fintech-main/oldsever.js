// Import necessary modules
import sequelize from './config/config.js';
import User from './models/user.js';
import Transaction from './models/transaction.js';


try {
  // Test the database connection
  await sequelize.authenticate();
  console.log('Database connected');

  // Synchronize the User and Transaction models
  await User.sync();
  await Transaction.sync();
  console.log('Database synchronized');

} catch (error) {
  // Log any errors that occur during the connection or synchronization process
  console.error('Error connecting to the database:', error);
}