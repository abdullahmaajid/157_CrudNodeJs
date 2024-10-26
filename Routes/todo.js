const express = require('express');
const router = express.Router();

let todos = [
    { id: 1, task: "Belajar Node.Js", completed: false },
    { id: 2, task: "Membuat API", completed: false },
];

// GET all todos
router.get('/', (req, res) => {
    res.json(todos);
});
 
// POST a new todo
router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1, // Generate a new ID based on the current length
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo); // Add the new todo to the array
    res.status(201).json(newTodo); // Respond with the created todo
});

// DELETE a todo by ID
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id)); // Find index by ID
    if (todoIndex === -1) {
        return res.status(404).json({ message: 'Tugas tidak ditemukan' }); // Not found
    }
    const deletedTodo = todos.splice(todoIndex, 1)[0]; // Remove the todo from the array
    res.status(200).json({ message: `Tugas '${deletedTodo.task}' telah dihapus` }); // Confirm deletion
});


// PUT (update) a todo by ID
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id)); // Find todo by ID
    if (!todo) {
        return res.status(404).json({ message: 'Tugas tidak ditemukan' }); // Not found
    }
    todo.task = req.body.task || todo.task; // Update task if provided
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed; // Update completed status if provided
    res.status(200).json({
        message: 'Tugas dengan ID ${todo.id} telah diperbarui',
        updatedTodo: todo // Respond with the updated todo
    });
});

module.exports = router;
