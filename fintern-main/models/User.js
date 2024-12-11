import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 


const User = sequelize.define('User',{
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
 
 id: {
 type: DataTypes.INTEGER,
 primaryKey: true,
 AutoIncrement: true},

 username: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},

email: {
 type: DataTypes.STRING,
 allowNull: false,
 unique: true,
 validate: {
 isEmail: true,
 },
},

password_hash: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
},

balance: {
  type: DataTypes.DECIMAL(10,2),
  defaultValue: 0.00,
},

},
{timestamps: true

});

export default User;

