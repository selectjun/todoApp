const ADD_TODO = "todoList/ADD_TODO";
const DELETE_TODO = "todoList/DELETE_TODO";
const COMPLETE_TODO = "todoList/COMPLETE_TODO";
const UPDATE_TODO = "todoList/UPDATE_TODO"

export const addTodo = todo => ({type: ADD_TODO, todo});
export const deleteTodo = todoId => ({type: DELETE_TODO, todoId});
export const completeTodo = todoId => ({type: COMPLETE_TODO, todoId});
export const updateTodo = todo => ({type: UPDATE_TODO, todo});

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case DELETE_TODO:
      return state.filter(todo => todo.todoId !== action.todoId);
    case COMPLETE_TODO:
      return state.map(
        todo => todo.todoId === action.todoId
        ? {
          ...todo,
          isComplete: !todo.isComplete,
        }
        : todo
    );
    case UPDATE_TODO:
      return state.map(
        todo => todo.todoId === action.todo.todoId
        ? action.todo
        : todo
    );
    default:
      return state;
  }
}