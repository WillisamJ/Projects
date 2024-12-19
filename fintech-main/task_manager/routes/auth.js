import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth.js';
import { Transaction, User } from '../models/DatabaseCreation.js';

const router = express.Router();

// Render register page
router.get('/register', (req, res) => {
    res.render('register');
});

// Render login page
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByPk(req.userId, {
            include: [Transaction]
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const accountBalance = user.Transactions.reduce((total, transaction) => {
            if (transaction.type === 'income') {
                return total + parseFloat(transaction.amount);
            } else {
                return total - parseFloat(transaction.amount);
            }
        }, 0);

        res.render('dashboard', { accountBalance, userId: req.userId });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Error loading dashboard');
    }
});


router.post('/transactions', authenticateToken, async (req, res) => {
    try {
        const { type, amount, description } = req.body;
        await Transaction.create({
            type,
            amount: parseFloat(amount),
            description,
            userId: req.userId
        });
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).send('Error creating transaction');
    }
});

// Handle user registration
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.render('register', { error: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'Error registering user' });
    }
});

// Handle user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Set token in cookie
        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'Error logging in' });
    }
});

router.get('/transactions', authenticateToken, async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: { userId: req.userId },
            order: [['createdAt', 'DESC']]
        });
        res.render('transactions', { transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).render('error', { message: 'Error fetching transactions' });
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

export default router;