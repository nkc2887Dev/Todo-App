import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    onSubmit(title);
    setTitle('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <button type="submit" className="add-button">
        Add Todo
      </button>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
};

export default TodoForm; 