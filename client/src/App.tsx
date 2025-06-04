import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (err) {
      setError('Failed to fetch todos');
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await axios.post('http://localhost:5000/todos', { title });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      const response = await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !todo.completed
      });
      
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
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
      />
    </div>
  );
};

export default App;
