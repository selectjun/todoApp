import React, { useCallback, useEffect, useState, useReducer } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker"

import Aside from "@components/Aside"
import Header from "@components/Header"
import TodoList from "@components/TodoList";
import TodoFooter from "@components/TodoFooter";

import { API } from "@components/axios";

import "./main.scss"
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  todoCount: 0,
  input: {
    todoId: "",
    title: "",
    contents: "",
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
    file: {
      originalName: "",
      path: ""
    },
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
    case "CHANGE_TODO_FILE":
      return {
        ...state,
        todo: {
          ...state.todo,
          file: action.file
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
    case "CHANGE_START_AT":
      return {
        ...state,
        todo: {
          ... state.todo,
          startAt: action.startAt
        }
      }
    case "CHANGE_END_AT":
      return {
        ...state,
        todo: {
          ... state.todo,
          endAt: action.endAt
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todoId, setTodoId] = useState(null);

  const { todoCount, input, todo, filter, currentIsCompleteAll } = state;
  
  // 입력 데이터 변경 처리
  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_INPUT", name, value });
  });

  // 수정 데이터 변경 처리
  const onChangeTodo = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({ type: "CHANGE_TODO", name, value });
  });

  // 제목 초기화
  const onResetTitle = useCallback(() => dispatch({ type: "RESET_TITLE" }));

  // 갯수 증가
  const onIncreaseTodoCount = useCallback(() => dispatch({ type: "INCREASE_TODO_COUNT" }));

  // 갯수 감소
  const onDecreaseTodoCount = useCallback(() => dispatch({ type: "DECREASE_TODO_COUNT" }));

  // 필터 처리
  const onChangeFilter = useCallback((filter) => dispatch({ type: "CHANGE_FILTER", filter }));

  // 토글 처리
  const onChangeCurrentIsCompleteAll = useCallback(() => dispatch({ type: "CHANGE_CURRENT_IS_COMPLETE_ALL" }));

  // 기본키 등록
  const onSetTodoId = useCallback((todoId) => dispatch({ type: "SET_TODO_ID", todoId}));

  // 시작일시 변경
  const onChangeStartAt = useCallback((startAt) => dispatch({ type: "CHANGE_START_AT", startAt}));

  // 종료일시 변경
  const onChangeEndAt = useCallback((endAt) => dispatch({ type: "CHANGE_END_AT", endAt}));

  // TODO 파일 변경
  const onChangeTodoFile = useCallback((file) => dispatch({ type: "CHANGE_TODO_FILE", file }));

  // TODO 완료 여부 변경
  const onChangeTodoIsComplete = useCallback(() => dispatch({ type: "CHANGE_TODO_IS_COMPLETE" }));

  // 수정 팝업 열기
  const onClickOpenModal = (todoId) => {
    setModalIsOpen(true);
    setTodoId(todoId);
  }

  // 수정 팝업 닫기
  const onClickCloseModal = () => {
    setModalIsOpen(false);
    setTodoId(null);
  }

  // To Do 추가
  const onSubmitTodo = useCallback(() => {
    const url = `/todo/?title=${input.title}`;
    API.post(url).then(res => {
      if (res.data.success) {
        onSetTodoId(res.data.todoId);
        addTodo(state.input);
        onIncreaseTodoCount();
        onResetTitle();
      } else {
        alert("에러가 발생하였습니다.\n잠시 후, 다시 시도해주세요.");
      }
    })
  });

  // To Do 수정
  const onSubmitModifyTodo = useCallback(() => {
    if (confirm("수정하시겠습니까?")) {
      const url = `/todo/${todo.todoId}/?title=${todo.title}&isComplete=${todo.isComplete}&startAt=${todo.startAt}&endAt=${todo.endAt}&contents=${todo.contents}`;
      API.put(url, todo.file).then(res => {
        if (res.data.success) {
          updateTodo(todo);
          onClickCloseModal();
        }
      });
    }
  });

  // To Do 삭제
  const onClickDeleteTodo = () => {
    const url = `/todo/${todoId}/delete/`;
    API.put(url).then(res => {
      if (res.data.success) {
        deleteTodo(todoId);
        onDecreaseTodoCount();
        onClickCloseModal();
      } else {
        alert("삭제하는 중, 에러가 발생하였습니다.");
      }
    });
  };

  // 완료된 To Do 일괄 삭제 처리
  const clearCompleted = () => {
    todoList.filter(todo => todo.isComplete).map(todo => {
      const url = `/todo/${todo.todoId}/delete/`;
      API.put(url).then(res => {
        if (res.data.success) {
          deleteTodo(todo.todoId);
          onDecreaseTodoCount();
        }
      });
    });
  };

  // 초기화
  useEffect(() => {
    // To Do 목록 가져오기
    API.get("/todo/").then(res => {
      if (res.data.success) {
        res.data.todoList.map(todo => addTodo(todo));
      }
    });

    // To Do 전체 갯수 가져오기
    API.get("/todo/count/").then(res => {
      if (res.data.success) {
        dispatch({
          type: "SET_TODO_COUT",
          todoCount: res.data.count
        });
      }
    });
  }, []);

  // 수정 팝업 데이터 불러오기
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
      <Aside />
      <Header />
      <section className="contents white shandow">
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
          currentIsCompleteAll={currentIsCompleteAll}
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

      {/* 수정 팝업 */}
      <Modal
        isOpen={modalIsOpen}
        style={{
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
        }}
        ariaHideApp={false}
        parentSelector={() => document.querySelector('#root')}
        contentLabel="Example Modal">
        <div className="todo-popup">
          <input
            type="text"
            name="title"
            className="title"
            value={todo.title}
            onChange={onChangeTodo} />
          <dl>
            <dt>생성 일자</dt>
            <dd>{todo.createAt}</dd>
            <dt>완료 여부</dt>
            <dd>
              <input 
                type="checkbox"
                name="isComplete"
                id="isComplete"
                checked={todo.isComplete}
                onChange={onChangeTodoIsComplete} />
            </dd>
            <dt>시작 일시</dt>
            <dd>
              <DatePicker
                dateFormat="yyyy-MM-dd hh:mm"
                selected={todo.startAt ? new Date(todo.startAt) : null}
                onChange={onChangeStartAt}
                showTimeSelect />
            </dd>
            <dt>종료 일시</dt>
            <dd>
              <DatePicker
                dateFormat="yyyy-MM-dd hh:mm"
                selected={todo.endAt ? new Date(todo.endAt) : null}
                onChange={onChangeEndAt}
                showTimeSelect />
            </dd>
            <dt>내용</dt>
            <dd>
              <textarea
                name="contents"
                cols="30" 
                rows="10"
                value={todo.contents ? todo.contents : ""}
                onChange={onChangeTodo}></textarea>
            </dd>
            <dt>첨부 파일</dt>
            <dd>
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  const file = new FormData();
                  file.append("file", e.target.files[0]);
                  onChangeTodoFile(file);
                }} />
                {
                  todo.file.originalName
                  ? <ul>
                    <li><a href={todo.file.path}>{todo.file.originalName}</a></li>
                  </ul>
                  : null
                }
            </dd>
          </dl>
          <div className="button-group">
            <button
              type="button"
              className="button cancel left"
              onClick={onClickDeleteTodo}>삭제</button>
            <button
              type="button"
              className="button submit right"
              onClick={onSubmitModifyTodo}>수정</button>
            <button
              type="button"
              className="button cancel right"
              onClick={onClickCloseModal}>취소</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}


export default Main;