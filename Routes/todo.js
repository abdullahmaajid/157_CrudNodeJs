const express = require('express');
const router = express.Router();

let todos = [
    {
        id: 1, task: "Belajar Node.Js", completed: false
    },
    {
    id: 2, task: "Membuat API", completed: false
    },
];

//Endpoint untuk mendapatkan data todos
router.get('/', (req, res) => {
    res.json(todos);
});

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT: Update a todo by ID
router.put('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const { task, completed } = req.body;

    // Find the todo by id
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        // Update the todo with new data
        todos[todoIndex] = {
            ...todos[todoIndex],
            task: task !== undefined ? task : todos[todoIndex].task,
            completed: completed !== undefined ? completed : todos[todoIndex].completed
        };
        res.json(todos[todoIndex]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// DELETE: Remove a todo by ID
router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);

    // Find the todo by id
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    if (todoIndex !== -1) {
        // Remove the todo from the array
        const deletedTodo = todos.splice(todoIndex, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
}); 





module.exports = router;