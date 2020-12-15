const ADD_TODO = "todoList/ADD_TODO";
const DELETE_TODO = "todoList/DELETE_TODO";

export const addTodo = todo => ({type: ADD_TODO, todo});
export const deleteTodo = todoId => ({type: DELETE_TODO, todoId});

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case DELETE_TODO:
      return state.filter(todo => todo.todoId !== action.todoId);
    default:
      return state;
  }
}