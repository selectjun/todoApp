import React from "react";
import { Link } from "react-router-dom";

import "./aside.scss"

const Aside = () => {
  const onToggleMenu = (e) => {
    e.preventDefault();
    document.querySelector(".container").classList.toggle("on");
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
        <li><Link to="/todo">TODOS</Link></li>
        <li><Link to="/user">회원정보</Link></li>
      </ul>
      <ul>
        <li>
          <a href="#" onClick={logout}>logout</a>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;