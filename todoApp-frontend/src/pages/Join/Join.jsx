import React, { useEffect, useReducer } from "react";
import sha256 from "sha256";

import Header from "@components/Header";
import UserBox from "@components/UserBox";
import validater from "@helpers/validate.helper.js"

import { API } from "@components/axios";

import "./join.scss"

const initialState = {
  id: "",
  password: "",
  retryPassword: "",
  name: "",
  email: ""
}

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value
      }
    default: 
      return state;
  }
}

const Join = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => { }, [state]);

  const handleJoinData = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value
    });
  }

  const onSubmitJoin = () => {
    if (validater.isEmpty(state.id)) {
      alert("아이디를 입력해주세요");
      document.getElementsByName("id")[0].focus();
    } else if (validater.isEmpty(state.password)) {
      alert("패스워드를 입력해주세요");
      document.getElementsByName("password")[0].focus();
    } else if (!validater.isPassword(state.password)) {
      alert("패스워드 형식에 맞게 입력해주세요\n두 종류 이상의 문자구성 및 8자리 이상으로 구성해주세요\n(알파벳 대/소문자, 숫자, 특수기호 \"$@!%*?&\")");
      document.getElementsByName("password")[0].focus();
    } else if (validater.isEmpty(state.password)) {
      alert("패스워드 확인을 입력해주세요");
      document.getElementsByName("retryPassword")[0].focus();
    } else if (state.password !== state.retryPassword) {
      alert("Password가 일치하지 않습니다");
      document.getElementsByName("password")[0].focus();
    } else if (validater.isEmpty(state.name)) {
      alert("이름을 입력해주세요");
      document.getElementsByName("name")[0].focus();
    } else if (validater.isEmpty(state.email)) {
      alert("이메일을 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else if (!validater.isEmail(state.email)) {
      alert("이메일 형식에 맞게 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else {
      // 회원 가입
      const url = `/api/user/?id=${state.id}&password=${sha256(state.password)}&name=${state.name}&email=${state.email}`;
      API.post(url).then(res => {
        if (res.data.success) {
          alert("회원가입이 되었습니다.");
          location.href = "/login";
        } else {
          alert("회원가입 중, 에러가 발생하였습니다.");
        }
      });
    }
  };

  useEffect(() => { document.title = "Join | Todo App"; }, []);

  return (
    <div className="container join">
      <Header />
      <section className="contents white shadow">
        <input
          type="text"
          name="id"
          className="login-inp top-line"
          value={state.id}
          onChange={handleJoinData}
          placeholder="ID" />
        <input
          type="password"
          name="password"
          className="login-inp"
          value={state.password}
          onChange={handleJoinData}
          placeholder="Password" />
        <input
          type="password"
          name="retryPassword"
          className="login-inp"
          value={state.retryPassword}
          onChange={handleJoinData}
          placeholder="Retry password" />
        <input
          type="text"
          name="name"
          className="login-inp"
          value={state.name}
          onChange={handleJoinData}
          placeholder="Name" />
        <input
          type="text"
          name="email"
          className="login-inp"
          value={state.email}
          onChange={handleJoinData}
          placeholder="E-Mail" />
        <button
            type="button"
            className="login-btn"
            onClick={onSubmitJoin}>JOIN</button>
      </section>
      <UserBox page={"JOIN"} />
    </div>
  );
}

export default Join;