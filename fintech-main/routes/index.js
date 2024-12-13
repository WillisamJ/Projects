import express from 'express';
const router = express.Router();

router.get('/user.js', (req, res) => {
// Dashboard logic (fetch data, render view)
});

router.get('/transaction.js', (req, res) => {
// Transaction history logic (fetch data, render view)
});

module.exports = router;