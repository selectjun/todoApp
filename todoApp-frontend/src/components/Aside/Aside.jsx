import React from "react";
import { Link } from "react-router-dom";

import "./aside.scss"

const Aside = () => {
  return (
    <aside className="aside">
      <ul>
        <li><a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(".container").classList.toggle("on");
          }}>메뉴</a></li>
        <li><a href="">todos</a></li>
        <li><Link to="/todo">회원정보</Link></li>
      </ul>
      <ul>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (confirm("정말로 로그아웃을 하시겠습니까?")) {
                sessionStorage.setItem("xAuthToken", null);
                location.href = "/login";
              }
            }}>logout</a>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;