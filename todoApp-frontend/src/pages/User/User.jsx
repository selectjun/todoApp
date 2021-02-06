import React, { useEffect, useState } from "react"
import sha256 from "sha256";

import Aside from "@components/Aside"
import Header from "@components/Header"

import UserInfo from "./UserInfo";
import PasswordAuth from "./PasswordAuth";

import { API } from "@components/axios";

import "./user.scss";

const User = () => {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  };

  const onClickPasswordAuth = () => {
    const url = `/api/user/password/${sha256(password)}/`
    API.post(url).then(res => {
      if (res.data.success) {
        alert(res.data.message);
        setIsAuth(true);
      }
    });
  };

  useEffect(() => { document.title = "User | Todo App"; }, []);

  return (
    <div className="container user">
      <Aside />
      <Header />
      <section className="contents">
        {
          isAuth
          ? <UserInfo password={password} />
          : <PasswordAuth
              password={password}
              onChangePassword={onChangePassword}
              onClickPasswordAuth={onClickPasswordAuth} />
        }
      </section>
    </div>
  );
}

export default User;