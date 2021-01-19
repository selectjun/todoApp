import React from "react";

import Header from "@components/Header";
import UserBox from "@components/UserBox";
import FindId from "./FindId";
import FindPassword from "./FindPassword";


import "./find.scss";

const Find = ({ match }) => {
  const renderTarget = (target) => {
    switch (target) {
      case "id":
        return (
          <section className="contents white shadow">
            <FindId />
          </section>
        );
      case "password":
        return (
          <section className="contents white shadow">
            <FindPassword />
          </section>
        );
      default:
        return (
          <section className="contents">
            잘못된 접근입니다.
          </section>
        );
    }
  };

  return (
    <div className="container login">
      <Header />
      { match.params.target && renderTarget(match.params.target) }
      <UserBox page={"FIND"} />
    </div>
  );
}

export default Find;