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
    </div>
  );
}

export default Login;