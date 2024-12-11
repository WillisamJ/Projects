import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

const Transaction = sequelize.define('Transaction',{
id: {
type: DataTypes.INTEGER,
primaryKey: true,
AutoIncrement: true},

amount: {
type: DataTypes.DECIMAL,
allowNull: false},

type: {
type: DataTypes.ENUM('Credit', 'Debit'),
allowNull: false},

description: {
type: DataTypes.STRING,
allowNull: false
},

user_id: {
type: DataTypes.INTEGER,
allowNull: false,
  references: {
    model: 'users',
    Key: 'id',
    },
  },
}, {
  timestamps: true,
});

export default Transaction;