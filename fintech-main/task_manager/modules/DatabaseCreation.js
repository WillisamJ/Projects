import { sequelize } from '../config/config.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
// this is how the user will be controll there finances
const Transaction = sequelize.define('Transaction', {
    type: {
        type: DataTypes.ENUM('income', 'expense', 'withdraw'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, { 
    timestamps: true,
    tableName: 'transactions'
});
// here is how we validate the users credentials
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { 
    timestamps: true,
    tableName: 'users'
});

// Define relationships
User.hasMany(Transaction, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Transaction.belongsTo(User, {
    foreignKey: 'userId'
});
// connecting the DB to Sequelize
const createDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        // Force recreate tables
        await sequelize.sync({ force: true });
        console.log('Database and tables synchronized');
        
        // Insert sample data
        await insertSampleData();
    } catch (error) {
        console.error('Unable to initialize database:', error);
    }
};

const insertSampleData = async () => {
    try {
        // Check if there are any users
        const userCount = await User.count();
        if (userCount === 0) {
            // Create default user
            const defaultUser = await User.create({
                name: 'Default User',
                email: 'default@example.com',
                password: await bcrypt.hash('password123', 10)
            });
            console.log('Default user created:', defaultUser.id);

            // Create sample transactions for the default user
            await Transaction.bulkCreate([
                { 
                    type: 'income', 
                    amount: 1000.00, 
                    description: 'Initial deposit',
                    userId: defaultUser.id 
                },
                { 
                    type: 'expense', 
                    amount: 200.00, 
                    description: 'Groceries',
                    userId: defaultUser.id 
                },
                { 
                    type: 'income', 
                    amount: 500.00, 
                    description: 'Salary',
                    userId: defaultUser.id 
                },
            ]);
            console.log('Sample transactions created');
        }
    } catch (error) {
        console.error('Error inserting sample data:', error);
    }
};

export { createDatabase, Transaction, User };