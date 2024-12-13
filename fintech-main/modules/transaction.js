import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

const User = sequelize.define('transaction.js', {
 // Define transaction models: id, amount, type, desctip, user_id
 id: {
    type: DataTypes.INTEGER,
    allowNull: false
 },
 user_id: {
   type: DataTypes.INTEGER,
   allowNull: false
 },
    amount: {
    type: DataTypes.DECIMAL,
    allowNull: false
},
desctip: {
    type: DataTypes.STRING,
}
 // ... other attributes
});

module.default = transaction;

