import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import "./App.css";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const baseUrl = "http://localhost:9876/api/todos";

  const fetchTodos = async () => {
    try {
      const response = await axios.get(baseUrl);
      setTodos(response?.data?.data);
    } catch (err) {
      setError("Failed to fetch todos");
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await axios.post(baseUrl, { title });
      setTodos([...todos, response?.data?.data]);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const toggleTodo = async (_id: string) => {
    try {
      const todo = todos.find((t) => t._id === _id);
      if (!todo) return;

      const response = await axios.put(`${baseUrl}/${_id}`, {
        completed: !todo.completed,
      });

      setTodos(todos.map((t) => (t._id === _id ? response?.data?.data : t)));
      
      // If todo is checked, open edit mode
      if (!todo.completed) {
        setEditingTodoId(_id);
      }
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const updateTodoTitle = async (id: string, newTitle: string) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, { title: newTitle });
      setTodos(todos.map((t) => (t._id === id ? response?.data?.data : t)));
      setEditingTodoId(null);
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (_id: string) => {
    try {
      await axios.delete(`${baseUrl}/${_id}`);
      setTodos(todos.filter((t) => t._id !== _id));
      if (editingTodoId === _id) {
        setEditingTodoId(null);
      }
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      {error && <div className="error">{error}</div>}
      <TodoForm onSubmit={addTodo} />
      <TodoList 
        todos={todos} 
        onToggle={toggleTodo} 
        onDelete={deleteTodo}
        editingTodoId={editingTodoId}
        onEdit={(id) => setEditingTodoId(id)}
        onSave={updateTodoTitle}
        onCancelEdit={() => setEditingTodoId(null)}
      />
    </div>
  );
};

export default App;
