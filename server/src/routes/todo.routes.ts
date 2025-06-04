import { Router } from 'express';
import { 
  getAllTodos, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from '../controllers/todo.controller';
import { validate } from '../middleware/validate.middleware';
import { createTodoValidator, updateTodoValidator } from '../validators/todo.validator';

const router = Router();

router.get('/', getAllTodos);
router.post('/', validate(createTodoValidator), createTodo);
router.put('/:id', validate(updateTodoValidator), updateTodo);
router.delete('/:id', deleteTodo);

export default router; 