import { Todo } from '../models/todo.model';
import type { ITodo } from '../@types/index.interface';

export const getAllTodos = async (): Promise<ITodo[]> => {
    return Todo.find().sort({ createdAt: -1 });
};

export const createTodo = async (title: string): Promise<ITodo> => {
    return Todo.create({ title });
};

export const updateTodo = async (id: string, updates: Partial<ITodo>): Promise<ITodo | null> => {
    return Todo.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
    );
};

export const deleteTodo = async (id: string): Promise<ITodo | null> => {
    return Todo.findByIdAndDelete(id);
}; 