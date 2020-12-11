import React, { useEffect, useState } from "react";
import sha256 from "sha256";

import { API } from "@components/axios";

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
    const url = `/token/?id=${loginData.id}&password=${sha256(loginData.password)}`;
    API.post(url).then(res => {
      window.location.href = "/";
    });
  }

  return (
    <div>
      <h1>Login Page...</h1>
      <input 
        type="text"
        name="id"
        placeholder="아이디"
        value={loginData.id}
        onKeyDown={e => e.key == "Enter" ? submitLogin() : ""}
        onChange={e => handleLoginData("id", e.target.value) } />
      <br />
      <input
        type="password"
        name="password"
        placeholder="암호"
        value={loginData.password}
        onKeyDown={e => e.key == "Enter" ? submitLogin() : ""}
        onChange={e => handleLoginData("password", e.target.value)} />
        <br />
        <input
          type="button"
          value={"login"}
          onClick={submitLogin} />
    </div>
  );
}

export default Login;