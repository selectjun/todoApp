const CHANGE_TITLE = "todo/CHANE_TITLE";
const 

export const changeTitle = title => ({type: CHANGE_TITLE, title});

/*
const initialState = {
  todoId: null,
  title: "",
  createAt: null,
  updateAt: null,
  isComplete: false,
  isDelete: false
};
*/

const initialState = {
  todoList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      console.log(action.title);
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
}