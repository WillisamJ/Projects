import express from 'express';
import sequelize from './config/database';
import routes from './routes';

// Test database connection
sequelize.authenticate()
 .then(() => console.log('Database connected'))
 .catch(err => console.log('Error connecting to database:', err));

app.use('/index.js', routes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});