const MESSAGE = {
  SUCCESS: {
    TODO: {
      FETCHED: 'Todos fetched successfully',
      CREATED: 'Todo created successfully',
      UPDATED: 'Todo updated successfully',
      DELETED: 'Todo deleted successfully'
    }
  },
  ERROR: {
    TODO: {
      NOT_FOUND: 'Todo not found',
      TITLE_REQUIRED: 'Title is required'
    },
    VALIDATION: 'Validation Error',
    INTERNAL_SERVER: 'Internal Server Error'
  }
};

export default MESSAGE; 