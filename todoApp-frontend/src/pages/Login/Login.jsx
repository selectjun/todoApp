import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import sha256 from "sha256";

import { API } from "@components/axios";

import "./login.scss"

const Login = () => {
  const [loginData, setLoginData] = useState({id: "", password: ""});

  useEffect(() => {
    return () => {
      if (sessionStorage.getItem("xAuthToken")) {
        window.location.href = "/";
      }
    }
  }, []);

  const handleLoginData = (type, value) => {
    setLoginData({
      ...loginData,
      [type]: value
    });
  }

  const submitLogin = () => {
    if (!loginData.id.replace(/^\s+|\s+$/g,"")) {
      alert("아이디를 입력해주세요");
    } else if (!loginData.password.replace(/^\s+|\s+$/g,"")) {
      alert("암호를 입력해주세요");
    } else {
      const url = `/token/?id=${loginData.id}&password=${sha256(loginData.password)}`;
      API.post(url).then(res => {
        window.location.href = "/todo";
      });
    }
  }

  return (
    <div className="container">
      <section className="login-box">
        <input 
          type="text"
          className="login-inp"
          name="id"
          id="id"
          placeholder="ID"
          value={loginData.id}
          onKeyDown={e => e.key == "Enter" ? submitLogin() : false}
          onChange={e => handleLoginData("id", e.target.value) } />
        <br />
        <input
          type="password"
          className="login-inp"
          name="password"
          id="password"
          placeholder="Password"
          value={loginData.password}
          onKeyDown={e => {
            if(e.key == "Enter") {
              submitLogin();
            }
          }}
          onChange={e => handleLoginData("password", e.target.value)} />
          <br />
          <button
            type="button"
            className="login-btn"
            onClick={submitLogin}>LOGIN</button>
      </section>
      <div className="user-box">
        <a href="/join">회원가입</a>
        <br />
        <a href="#">아이디/암호 찾기</a>
      </div>
    </div>
  );
}

export default Login;