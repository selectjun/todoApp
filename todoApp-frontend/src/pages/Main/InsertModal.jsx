import React from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker"

const InsertModal = ({
  input,
  insertModalIsOpen,
  onSubmitTodo,
  onChangeInput,
  onChangeInputFile,
  onChangeInputEndAt,
  onChangeInputStartAt,
  onClickCloseInertModal,
  onChangeInputIsComplete
}) => {
  return (
    <Modal
      isOpen={insertModalIsOpen}
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
          value={input.title ? input.title : ""}
          onChange={onChangeInput}
          placeholder="What needs to be done?" />
        <dl>
          <dt>완료 여부</dt>
          <dd>
            <input 
              type="checkbox"
              name="isComplete"
              id="isComplete"
              checked={input.isComplete}
              onChange={onChangeInputIsComplete} />
          </dd>
          <dt>시작 일시</dt>
          <dd>
            <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              selected={input.startAt ? new Date(input.startAt) : null}
              onChange={onChangeInputStartAt}
              showTimeSelect />
          </dd>
          <dt>종료 일시</dt>
          <dd>
            <DatePicker
              dateFormat="yyyy-MM-dd hh:mm"
              selected={input.endAt ? new Date(input.endAt) : null}
              onChange={onChangeInputEndAt}
              showTimeSelect />
          </dd>
          <dt>내용</dt>
          <dd>
            <textarea
              name="contents"
              cols="30" 
              rows="10"
              value={input.contents ? input.contents : ""}
              onChange={onChangeInput}></textarea>
          </dd>
          <dt>첨부 파일</dt>
          <dd>
            <input
              type="file"
              name="file"
              onChange={(e) => {
                const file = new FormData();
                file.append("file", e.target.files[0]);
                onChangeInputFile(file);
              }} />
          </dd>
        </dl>
        <div className="button-group">
          <button
            type="button"
            className="button submit right"
            onClick={onSubmitTodo}>등록</button>
          <button
            type="button"
            className="button cancel right"
            onClick={onClickCloseInertModal}>취소</button>
        </div>
      </div>
    </Modal>
  );
};

export default InsertModal;