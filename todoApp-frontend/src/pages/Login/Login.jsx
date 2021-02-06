import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import sha256 from "sha256";

import Header from "@components/Header";
import UserBox from "@components/UserBox";
import { API } from "@components/axios";

import "./login.scss"

const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({id: "", password: ""});

  useEffect(() => {
    document.title = "Login | Todo App";

    if (sessionStorage.getItem("xAuthToken")) {
      history.push("/");
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
      const url = `/api/token/?id=${loginData.id}&password=${sha256(loginData.password)}`;
      API.post(url).then(res => {
        history.push("/todo");
      });
    }
  }

  return (
    <div className="container login">
      <Header />
      <section className="contents white shadow">
        <input 
          type="text"
          className="login-inp"
          name="id"
          id="id"
          placeholder="ID"
          value={loginData.id}
          onKeyDown={(e) => e.key == "Enter" ? submitLogin() : false}
          onChange={(e) => handleLoginData("id", e.target.value) } />
        <br />
        <input
          type="password"
          className="login-inp"
          name="password"
          id="password"
          placeholder="Password"
          value={loginData.password}
          onKeyDown={(e) => e.key == "Enter" ? submitLogin() : false}
          onChange={(e) => handleLoginData("password", e.target.value)} />
          <br />
          <button
            type="button"
            className="login-btn"
            onClick={submitLogin}>LOGIN</button>
      </section>
      <UserBox page={"LOGIN"} />
    </div>
  );
}

export default Login;