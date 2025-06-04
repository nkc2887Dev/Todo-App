import Joi from 'joi';

export const createTodoValidator = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required'
  })
});

export const updateTodoValidator = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.empty': 'Title cannot be empty'
  }),
  completed: Joi.boolean().optional().messages({
    'boolean.base': 'Completed must be a boolean value'
  })
}); 