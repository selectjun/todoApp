import React, { useCallback, useEffect, useState, useReducer } from "react";
import Modal from "react-modal";

import Aside from "@components/Aside"
import Header from "@components/Header"
import TodoList from "@components/TodoList";
import TodoFooter from "@components/TodoFooter";

import { API } from "@components/axios";

import "./main.scss"

const initialState = {
  todoCount: 0,
  input: {
    todoId: "",
    title: "",
    contents: "",
    createAt: null,
    updateAt: null,
    isComplete: false,
    isDelete: false
  },
  todo: {
    todoId: "",
    title: "",
    contents: "",
    createAt: null,
    updateAt: null,
    isComplete: false,
    isDelete: false
  },
  currentIsCompleteAll: false,
  filter: "ALL"
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO_COUT":
      return {
        ...state,
        todoCount: action.todoCount
      }
    case "INCREASE_TODO_COUNT":
      return {
        ...state,
        todoCount: state.todoCount + 1
      }
    case "DECREASE_TODO_COUNT":
      return {
        ...state,
        todoCount: state.todoCount - 1
      }
    case "SET_TODO_ID":
      return {
        ...state,
        input: {
          ...state.input,
          todoId: action.todoId
        }
      }
    case "SET_TODO":
      console.log(action.todo);
      return {
        ...state,
        todo: action.todo
      }
    case "RESET_TITLE":
      return {
        ...state,
        input: {
          ...state.input,
          title: ""
        }
      }
    case "CHANGE_INPUT":
      return {
        ...state,
        input: {
          ...state.input,
          [action.name]: action.value
        }
      }
      case "CHANGE_TODO":
        return {
          ...state,
          todo: {
            ...state.todo,
            [action.name]: action.value
          }
        }
    case "CHANGE_FILTER":
      return {
        ...state,
        filter: action.filter
      }
    case "CHANGE_CURRENT_IS_COMPLETE_ALL":
      return {
        ...state,
        currentIsCompleteAll: !state.currentIsCompleteAll
      }
    default:
      return state;
  }
}

const customStyles = {
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000
  },
  content : {
    width: "100%",
    maxWidth: "720px",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Main = ({
  todoList,
  addTodo,
  deleteTodo,
  completeTodo,
  updateTodo
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { todoCount, input, filter } = state;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value
    });
  });
  const onChangeTodo = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_TODO",
      name,
      value
    });
  });
  const onResetTitle = useCallback(() => dispatch({ type: "RESET_TITLE" }));
  const onIncreaseTodoCount = useCallback(() => dispatch({ type: "INCREASE_TODO_COUNT" }));
  const onDecreaseTodoCount = useCallback(() => dispatch({ type: "DECREASE_TODO_COUNT" }));
  const onChangeFilter = useCallback((filter) => dispatch({ type: "CHANGE_FILTER", filter: filter }));
  const onChangeCurrentIsCompleteAll = useCallback(() => dispatch({ type: "CHANGE_CURRENT_IS_COMPLETE_ALL" }));

  const onClickOpenModal = (todoId) => {
    setModalIsOpen(true);
    setTodoId(todoId);
  }

  const onClickCloseModal = () => {
    setModalIsOpen(false);
    setTodoId(null);
  }

  const onSubmitTodo = useCallback(() => {
    const url = `/todo/?title=${input.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_ID",
          todoId: res.data.todoId
        });
        addTodo(state.input);
        onIncreaseTodoCount();
        onResetTitle();
      } else {
        alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    })
  });

  const onSubmitModifyTodo = useCallback(() => {
    if (confirm("수정하시겠습니까?")) {
      const url = `/todo/${state.todo.todoId}/?title=${state.todo.title}&isComplete=${state.todo.isComplete}&contents=${state.todo.contents}`;
      API.put(url).then(res => {
        if (res.data.success) {
          updateTodo(state.todo);
          onClickCloseModal();
        } else {
          alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
        }
      });
    }
  });

  const clearCompleted = () => {
    todoList.filter(todo => todo.isComplete).map(todo => {
      const url = `/todo/${todo.todoId}/delete/`;
      API.put(url).then(res => {
        if (res.data.success) {
          deleteTodo(todo.todoId);
          onDecreaseTodoCount();
        } else {
          alert("삭제하는 중, 에러가 발생하였습니다.");
        }
      });
    });
  }

  useEffect(() => {
    // To Do 목록 가져오기
    API.get("/todo/").then(res => {
      if (res.data.success) {
        res.data.todoList.map(todo => addTodo(todo));
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });

    // To Do 전체 갯수 가져오기
    API.get("/todo/count/").then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_COUT",
          todoCount: res.data.count
        });
      } else {
        alert("에러가 발생하였습니다.\n새로고침(F5) 후, 다시 시도해주세요.");
      }
    });
  }, []);

  useEffect(() => {
    if (modalIsOpen === true) {
      const url = `/todo/${todoId}/`
      API.get(url).then((res) => {
        dispatch({
          type: "SET_TODO",
          todo: res.data.todo
        });
      });
    }
  }, [modalIsOpen, todoId]);

  return (
    <div className="container todoapp">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
        parentSelector={() => document.querySelector('#root')}
        contentLabel="Example Modal">
        <div className="todo-popup">
          <input
            type="text"
            name="title"
            className="title"
            value={state.todo.title}
            onChange={onChangeTodo} />
          <dl>
            <dt>Created</dt>
            <dd>{state.todo.createAt}</dd>
            <dt>Complete or Not</dt>
            <dd>{state.todo.isComplete ? "Y" : "N"}</dd>
            <dt>Content</dt>
            <dd>
              <textarea
                name="contents"
                cols="30" 
                rows="10"
                value={state.todo.contents ? state.todo.contents : ""}
                onChange={onChangeTodo}></textarea>
            </dd>
          </dl>
          <button type="button" onClick={onClickCloseModal}>취소</button>
          <button type="button" onClick={onSubmitModifyTodo}>수정</button>
        </div>
      </Modal>
      <Aside />
      <Header />
      <section className="contents">
        <input
          type="text"
          name="title"
          className="new-todo"
          value={input.title}
          onChange={onChangeInput}
          onKeyDown={e => e.key === "Enter" ? onSubmitTodo(e): false }
          placeholder="What needs to be done?" />
        <TodoList
          filter={filter}
          todoList={todoList}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          currentIsCompleteAll={state.currentIsCompleteAll}
          onChangeCurrentIsCompleteAll={onChangeCurrentIsCompleteAll}
          onDecreaseTodoCount={onDecreaseTodoCount}
          onClickOpenModal={onClickOpenModal} />
        <TodoFooter
          filter={filter}
          todoCount={todoCount}
          isClearCompleted={todoCount - todoList.filter(todo => !todo.isComplete).length > 0}
          clearCompleted={clearCompleted}
          onChangeFilter={onChangeFilter} />
      </section>
    </div>
  );
}


export default Main;