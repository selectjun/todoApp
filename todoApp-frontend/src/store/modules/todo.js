const CHANGE_TITLE = "todo/CHANE_TITLE";

export const changeTitle = title => ({type: CHANGE_TITLE, title});

const initialState = {
  todoId: null,
  title: "",
  createAt: null,
  updateAt: null,
  isComplete: false,
  isDelete: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      console.log("title: " + action.title);
      return {
        ...state,
        title: action.title
      };
    default:
      return state;
  }
}