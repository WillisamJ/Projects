import Transaction from './models/Transaction.js';
import User from  './models/User.js';
import sequelize from './config/database.js';

try {
    await sequelize.authenticate();
    console.log ('Database connected');

    await User.sync();
    await Transaction.sync();
    console.log ('Database synchronized')

} catch (error) {
    
    console.log('error connecting to database:', error);

}

