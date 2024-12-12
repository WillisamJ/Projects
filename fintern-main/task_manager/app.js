import express from 'express';
import path from 'path';
import taskRoutes from './routes/tasks.js';

const app = express();

app.set('view engine', 'ejs');
app.set('view', './view'); // index.esj files should be in this folder 
app.use(express.json());
app.use('/', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//API Routes
//Task Routes Implementation
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.render('index', { tasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Frontend Templates
//Client-side JavaScript
//Handle frontend interactions in public/script.js:

/** Implement frontend functionality
 * Design the dashboard (homepage) that loads all the task when the site loads
 * implement the functionality that allows users to add a task, update a task and delete task
 *  
 * **/
const displayTasks = async () => {
    try {
        const response = await fetch('/tasks');
        const tasks = await response.json();
        
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};
displayTask();


