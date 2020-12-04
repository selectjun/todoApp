import React, { useState } from "react";

import { API } from "@components/axios";

const Login = () => {
  const [loginData, setLoginData] = useState({id: "", password: ""});

  const handleLoginData = (type, value) => {
    setLoginData({
      ...loginData,
      [type]: value
    });
  }

  const submitLogin = () => {
    const url = `/token/?id=${loginData.id}&password=${loginData.password}`;
    API.post(url).then(res => {
      window.location.reload();
    });
  }

  return (
    <div>
      <h1>Login Page...</h1>
      <input 
        type="text"
        name="id"
        placeholder="아이디"
        onChange={(e) => {
          handleLoginData("id", e.target.value);
        }} />
      <br />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="암호"
        onChange={(e) => {
          handleLoginData("password", e.target.value);
        }} />
        <br />
        <input
          type="button"
          value={"login"}
          onClick={submitLogin} />
    </div>
  );
}

export default Login;