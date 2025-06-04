import React from 'react';
import EditTodoForm from './EditTodoForm';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (_id: string) => void;
  onDelete: (_id: string) => void;
  editingTodoId: string | null;
  onEdit: (_id: string) => void;
  onSave: (_id: string, newTitle: string) => void;
  onCancelEdit: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  editingTodoId,
  onEdit,
  onSave,
  onCancelEdit 
}) => {
  if (todos.length === 0) {
    return <p className="no-todos">No todos yet! Add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo._id)}
          />
          {editingTodoId === todo._id ? (
            <EditTodoForm
              todoId={todo._id}
              initialTitle={todo.title}
              onSave={onSave}
              onCancel={onCancelEdit}
            />
          ) : (
            <>
              <span 
                className="todo-title"
                onClick={() => onEdit(todo._id)}
              >
                {todo.title}
              </span>
              <button
                className="delete-button"
                onClick={() => onDelete(todo._id)}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList; 