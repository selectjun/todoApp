import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker"

import { API } from "@components/axios";

const UpdateModal = ({
  todo,
  updateModalIsOpen,
  deleteTodo,
  onChangeTodo,
  onChangeTodoDate,
  onChangeTodoFile,
  onSubmitModifyTodo,
  onDecreaseTodoCount,
  onChangeTodoIsComplete,
  onClickCloseUpdateModal
}) => {
  const onClickDeleteTodoAfterCloseUpdateModal = () => {
    const url = `/api/todo/${todo.todoId}/delete/`;
    API.put(url).then(res => {
      if (res.data.success) {
        deleteTodo(todo.todoId);
        onDecreaseTodoCount();
        onClickCloseUpdateModal();
      }
    });
  };

  const downloadFile = (url, name) => {
    API.get(url, { responseType: "blob" }).then((res) => {
      const downloadLink = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
      
      const link = document.createElement("a");
      link.setAttribute("href", downloadLink);
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
    });
  };

  return (
    <Modal
      isOpen={updateModalIsOpen}
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
              onChange={(startAt) => onChangeTodoDate("startAt", startAt)}
              showTimeSelect />
          </dd>
          <dt>종료 일시</dt>
          <dd>
            <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              selected={todo.endAt ? new Date(todo.endAt) : null}
              onChange={(endAt) => onChangeTodoDate("endAt", endAt)}
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
                  <li>
                    <a
                      href="#"
                      onClick={(e) => downloadFile(todo.file.path, todo.file.originalName)}>
                      {todo.file.originalName}
                    </a>
                  </li>
                </ul>
                : null
              }
          </dd>
        </dl>
        <div className="button-group">
          <button
            type="button"
            className="button cancel left"
            onClick={onClickDeleteTodoAfterCloseUpdateModal}>삭제</button>
          <button
            type="button"
            className="button submit right"
            onClick={onSubmitModifyTodo}>수정</button>
          <button
            type="button"
            className="button cancel right"
            onClick={onClickCloseUpdateModal}>취소</button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModal;