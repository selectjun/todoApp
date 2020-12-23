import React from "react";
import { Link } from "react-router-dom";

import "./aside.scss"

const Aside = () => {
  const onToggleMenu = (e) => {
    e.preventDefault();
    document.querySelector(".container").classList.toggle("on");
    const iconName = document.querySelector(".container").classList.contains("on") ? "arrow_back" : "menu";
    document.querySelector("#menuBtn .material-icons").innerText = iconName;
  }

  const logout = (e) => {
    e.preventDefault();
    if (confirm("정말로 로그아웃을 하시겠습니까?")) {
      sessionStorage.setItem("xAuthToken", null);
      location.href = "/login";
    }
  }
  
  return (
    <aside className="aside">
      <button type="button" id="menuBtn" onClick={onToggleMenu}>
        <span className="material-icons">menu</span>
      </button>
      <ul>
        <li>
          <a href="/todo">
            <span className="material-icons">receipt_long</span>
            <span className="menu-name">TODOS</span>
          </a>
        </li>
        <li>
          <a href="/user">
            <span className="material-icons">portrait</span>
            <span className="menu-name">회원정보</span>
          </a>
        </li>
      </ul>
      <a href="#" onClick={logout}>LOGOUT</a>
    </aside>
  );
}

export default Aside;