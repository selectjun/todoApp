import React from "react";
import { Link } from "react-router-dom";

const UserBox = ({
  page
}) => {
  const JoinLink = () => <Link to="/join">회원가입</Link>;

  const LoginLink = () => <Link to="/login">로그인</Link>;

  const FindIdLink = () => <Link to="/find/id">아아디</Link>;

  const FindPasswordLink = () => <Link to="/find/password"> / 암호 찾기</Link>;

  switch (page) {
    case "LOGIN":
      return (
        <div className="user-box">
          <FindIdLink /><FindPasswordLink /><br />
          <JoinLink />
        </div>
      );
    case "JOIN":
      return (
        <div className="user-box">
          <FindIdLink /><FindPasswordLink /><br />
          <LoginLink />
        </div>
      );
    case "FIND":
      return (
        <div className="user-box">
          <FindIdLink /><FindPasswordLink /><br />
          <LoginLink />
        </div>
      );
    default:
      return null;
  }
};

export default UserBox;