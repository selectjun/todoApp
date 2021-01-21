import React, { useCallback, useEffect, useState, useReducer } from "react";

import Aside from "@components/Aside"
import Header from "@components/Header"
import TodoList from "@components/TodoList";
import TodoFooter from "@components/TodoFooter";
import InsertModal from "./InsertModal";
import UpdateModal from "./UpdateModal";

import { API } from "@components/axios";

import "./main.scss"
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  todoCount: 0,
  input: {
    todoId: "",
    title: "",
    contents: "",
    startAt: null,
    endAt: null, 
    file: null,
    createAt: null,
    updateAt: null,
    isComplete: false,
    isDelete: false
  },
  todo: {
    todoId: "",
    title: "",
    contents: "",
    startAt: null,
    endAt: null,
    fileId: null,
    file: null,
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
    case "SET_TODO":
      return {
        ...state,
        todo: action.todo
      }
    case "RESET_INPUT":
      return {
        ...state,
        input: initialState.input
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
    case "CHANGE_TODO_FILE":
      return {
        ...state,
        todo: {
          ...state.todo,
          file: action.file,
          fileId: null
        }
      }
    case "CHANGE_INPUT_FILE":
      return {
        ...state,
        input: {
          ...state.input,
          file: action.file,
          fileId: null
        }
      }
    case "CHANGE_TODO_IS_COMPLETE":
      return {
        ...state,
        todo: {
          ...state.todo,
          isComplete: !state.todo.isComplete
        }
      }
    case "CHANGE_INPUT_IS_COMPLETE":
      return {
        ...state,
        input: {
          ...state.input,
          isComplete: !state.input.isComplete
        }
      }
    case "CHANGE_TODO_DATE":
      return {
        ...state,
        todo: {
          ... state.todo,
          [action.field]: action.date ? action.date.toISOString() : ""
        }
      }
    case "CHANGE_INPUT_DATE":
      return {
        ...state,
        input: {
          ... state.input,
          [action.field]: action.date ? action.date.toISOString() : ""
        }
      }
    case "CHANGE_INPUT_START_AT":
      return {
        ...state,
        input: {
          ... state.input,
          startAt: action.startAt ? action.startAt.toISOString() : ""
        }
      }
    case "CHANGE_INPUT_END_AT":
      return {
        ...state,
        input: {
          ... state.input,
          endAt: action.endAt ? action.endAt.toISOString() : ""
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

const Main = ({
  todoList,
  addTodo,
  deleteTodo,
  completeTodo,
  updateTodo
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);

  const { todoCount, input, todo, filter, currentIsCompleteAll } = state;

  // 갯수 증가
  const onIncreaseTodoCount = useCallback(() => dispatch({ type: "INCREASE_TODO_COUNT" }));

  // 갯수 감소
  const onDecreaseTodoCount = useCallback(() => dispatch({ type: "DECREASE_TODO_COUNT" }));

  // 필터 처리
  const onChangeFilter = useCallback((filter) => dispatch({ type: "CHANGE_FILTER", filter }));

  // 토글 처리
  const onChangeCurrentIsCompleteAll = useCallback(() => dispatch({ type: "CHANGE_CURRENT_IS_COMPLETE_ALL" }));

  // 수정 데이터 변경 처리
  const onChangeTodo = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_TODO", name, value });
  });
  
  // 수정 데이터 일시 변경
  const onChangeTodoDate = useCallback((field, date) => dispatch({ type: "CHANGE_TODO_DATE", field: field, date: date }));

  // 수정 데이터 파일 변경
  const onChangeTodoFile = useCallback((file) => dispatch({ type: "CHANGE_TODO_FILE", file }));

  // 수정 데이터 완료 여부 변경
  const onChangeTodoIsComplete = useCallback(() => dispatch({ type: "CHANGE_TODO_IS_COMPLETE" }));

  // 등록 데이터 변경 처리
  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", name, value });
  });

  // 등록 데이터 초기화
  const onResetInput = useCallback(() => dispatch({ type: "RESET_INPUT" }));

  // 등록 데이터 일시 변경
  const onChangeInputDate = useCallback((field, date) => dispatch({ type: "CHANGE_INPUT_DATE", field: field, date: date }));

  // 등록 데이터 파일 변경
  const onChangeInputFile = useCallback((file) => dispatch({ type: "CHANGE_INPUT_FILE", file }));

  // 등록 데이터 완료 여부 변경
  const onChangeInputIsComplete = useCallback(() => dispatch({ type: "CHANGE_INPUT_IS_COMPLETE" }));

  // 등록 팝업 열기
  const onClickOpenInsertModal = useCallback(() => setInsertModalIsOpen(true));

  // 등록 팝업 닫기
  const onClickCloseInertModal = useCallback(() => {
    setInsertModalIsOpen(false);
    onResetInput();
  });

  // 수정 팝업 열기
  const onClickOpenUpdateModal = useCallback((todoId) => {
    const url = `/api/todo/${todoId}/`
    API.get(url).then((res) => {
      setUpdateModalIsOpen(true);
      dispatch({ type: "SET_TODO", todo: res.data.todo });
    });
  });

  // 수정 팝업 닫기
  const onClickCloseUpdateModal = useCallback(() => setUpdateModalIsOpen(false));

  // To Do 추가
  const onSubmitTodo = useCallback(() => {
    const url = `/api/todo/?title=${input.title}` +
                `&isComplete=${input.isComplete}` +
                `&startAt=${input.startAt}` +
                `&endAt=${input.endAt}` +
                `&contents=${input.contents}`;

    API.post(url, input.file).then(res => {
      if (res.data.success) {
        addTodo({ ...state.input, todoId: res.data.todoId });
        onIncreaseTodoCount();
        onResetInput();
        onClickCloseInertModal();
      }
    });
  });

  // 수정 처리
  const onSubmitModifyTodo = useCallback(() => {
    if (confirm("수정하시겠습니까?")) {
      const url = `/api/todo/${todo.todoId}/` +
                  `?title=${todo.title}` +
                  `&isComplete=${todo.isComplete}` +
                  `&startAt=${todo.startAt}` +
                  `&endAt=${todo.endAt}` +
                  `&contents=${todo.contents}` +
                  `&fileId=${todo.fileId}`;

      API.put(url, todo.file).then(res => {
        if (res.data.success) {
          updateTodo(todo);
          onClickCloseUpdateModal();
        }
      });
    }
  });

  // 초기화
  useEffect(() => {
    // 데이터 전체 갯수 가져오기
    API.get("/api/todo/count/").then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_COUT",
          todoCount: res.data.count
        });
        // 데이터 목록 가져오기
        API.get("/api/todo/").then(res => {
          if (res.data.success) {
            res.data.todoList.map(todo => addTodo(todo));
          }
        });
      }
    });
  }, []);

  return (
    <div className="container todoapp">
      <Aside />
      <Header />
      <section className="contents white shandow">
        <input
          type="text"
          name="title"
          className="new-todo"
          value={insertModalIsOpen ? "" : input.title}
          onChange={onChangeInput}
          onKeyDown={e => e.key === "Enter" ? onSubmitTodo(e): false }
          placeholder="What needs to be done?" />
        <button
          type="button"
          className="insert-modal-btn"
          onClick={onClickOpenInsertModal}>&#183;&#183;&#183;</button>
        <TodoList
          filter={filter}
          todoList={todoList}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          onDecreaseTodoCount={onDecreaseTodoCount}
          currentIsCompleteAll={currentIsCompleteAll}
          onClickOpenUpdateModal={onClickOpenUpdateModal}
          onChangeCurrentIsCompleteAll={onChangeCurrentIsCompleteAll} />
        <TodoFooter
          filter={filter}
          todoList={todoList}
          todoCount={todoCount}
          deleteTodo={deleteTodo}
          onChangeFilter={onChangeFilter}
          onDecreaseTodoCount={onDecreaseTodoCount}
          isClearCompleted={todoCount - todoList.filter(todo => !todo.isComplete).length > 0} />
      </section>
      <UpdateModal
        todo={todo}
        updateModalIsOpen={updateModalIsOpen}
        deleteTodo={deleteTodo}
        onChangeTodo={onChangeTodo}
        onChangeTodoDate={onChangeTodoDate}
        onChangeTodoFile={onChangeTodoFile}
        onSubmitModifyTodo={onSubmitModifyTodo}
        onDecreaseTodoCount={onDecreaseTodoCount}
        onChangeTodoIsComplete={onChangeTodoIsComplete}
        onClickCloseUpdateModal={onClickCloseUpdateModal} />
      <InsertModal
        input={input}
        insertModalIsOpen={insertModalIsOpen}
        onSubmitTodo={onSubmitTodo}
        onChangeInput={onChangeInput}
        onChangeInputDate={onChangeInputDate}
        onChangeInputFile={onChangeInputFile}
        onClickCloseInertModal={onClickCloseInertModal}
        onChangeInputIsComplete={onChangeInputIsComplete} />
    </div>
  );
}

export default Main;