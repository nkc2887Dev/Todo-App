const express = require("express");
const router = express.Router();
const FileSync = require("lowdb/adapters/FileSync");
const low = require("lowdb");
const adapter = new FileSync("db.json");
const db = low(adapter);

// Set default data
db.defaults({ todos: [] }).write();

// GET all todos
router.get("/", (req, res) => {
  const todos = db.get("todos").value();
  res.json(todos);
});

// POST new todo
router.post("/", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: Date.now().toString(),
    title: title.trim(),
    completed: false,
  };

  db.get("todos").push(newTodo).write();

  res.status(201).json(newTodo);
});

// PUT update todo
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = db.get("todos").find({ id }).value();

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.get("todos")
    .find({ id })
    .assign({
      title: title || todo.title,
      completed: completed !== undefined ? completed : todo.completed,
    })
    .write();

  res.json(db.get("todos").find({ id }).value());
});

// DELETE todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const todo = db.get("todos").find({ id }).value();

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  db.get("todos").remove({ id }).write();

  res.status(204).send();
});

module.exports = router;
