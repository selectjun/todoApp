import React, { useEffect, useState } from "react";
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
    console.log(value);
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
        window.location.href = "/";
      });
    }
  }

  return (
    <div className="login-container">
      <h2 className="login-title">LOGIN</h2>
      <div className="login-box">
        <input 
          type="text"
          className="inp-login"
          name="id"
          id="id"
          placeholder="아이디"
          value={loginData.id}
          onKeyDown={e => e.key == "Enter" ? submitLogin() : false}
          onChange={e => handleLoginData("id", e.target.value) } />
        <br />
        <input
          type="password"
          className="inp-login"
          name="password"
          id="password"
          placeholder="암호"
          value={loginData.password}
          onKeyDown={e => e.key == "Enter" ? submitLogin() : false}
          onChange={e => handleLoginData("password", e.target.value)} />
          <br />
          <input
            type="button"
            className="inp-submit"
            value={"LOGIN"}
            onClick={submitLogin} />
      </div>
      <div>
        <a href="#">회원가입</a>
        <br />
        <a href="">아이디/암호 찾기</a>
      </div>
    </div>
  );
}

export default Login;