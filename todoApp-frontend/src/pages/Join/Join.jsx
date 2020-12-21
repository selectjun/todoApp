import React from "react";

import Header from "@components/Header"

import "./join.scss"

const Join = () => {
  return (
    <div className="container join">
      <Header />
      <section className="contents">
        <input
          type="text"
          className="login-inp top-line"
          placeholder="ID" />
        <input
          type="password"
          className="login-inp"
          placeholder="Password" />
        <input
          type="PASSWORd"
          className="login-inp"
          placeholder="Retry password" />
        <input
          type="text"
          className="login-inp"
          placeholder="Name" />
        <input
          type="text"
          className="login-inp"
          placeholder="E-Mail" />
        <button
            type="button"
            className="login-btn">JOIN</button>
      </section>
      <div className="user-box">
        <a href="/login">로그인</a>
        <br />
        <a href="#">아이디/암호 찾기</a>
      </div>
    </div>
  );
}

export default Join;