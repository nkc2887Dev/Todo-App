import React, { useState } from 'react';

interface EditTodoFormProps {
  todoId: string;
  initialTitle: string;
  onSave: (id: string, newTitle: string) => void;
  onCancel: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ todoId, initialTitle, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    onSave(todoId, title);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="edit-todo-input"
        autoFocus
      />
      <div className="edit-todo-buttons">
        <button type="submit" className="save-button">
          Save
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}
    </form>
  );
};

export default EditTodoForm; 