import { DataTypes } from 'sequelize';
import sequelize from '../config/database'; 

const User = sequelize.define('user.js', {
 // Define user attributes (e.g., id, username, email, password_hash, balance)
 username: {
    type: DataTypes.STRING,
    allowNull: false
 },
 id: {
    type: DataTypes.INTEGER,
    allowNull: false
 },
 email: {
    type: DataTypes.STRING,
    allowNull: false
 },
 password: {
    type: DataTypes.STRING,
    allowNull: false
 },
 balance: {
    type: DataTypes.DECIMAL,
 }

 // ... other attributes
});

module.default = user;

//user.js.hasMany(Transaction.js, {
   // onUpdate: 
}//);
