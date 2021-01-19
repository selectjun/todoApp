import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { API } from "@components/axios";
import validater from "@helpers/validate.helper.js"

const FindPassword = () => {
  const history = useHistory();

  const [findData, setFindData] = useState({
    id: "",
    email: ""
  });

  const handleFindData = (e) => {
    const {name, value} = e.target;
    setFindData({
      ...findData,
      [name]: value
    });
  }

  const onSubmitFindPassword = () => {
    if (validater.isEmpty(findData.id)) {
      alert("아이디를 입력해주세요");
      document.getElementsByName("id")[0].focus();
    } else if (validater.isEmpty(findData.email)) {
      alert("이메일을 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else if (!validater.isEmail(findData.email)) {
      alert("이메일을 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else {
      const url = `/api/user/find/password/?id=${findData.id}&email=${findData.email}`;
      API.post(url).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          history.push("/login");
        }
      });
    }
  }

  return (
    <div>
      <input
        type="text"
        name="id"
        className="login-inp"
        value={findData.id}
        onChange={(e) => handleFindData(e)}
        onKeyDown={(e) => e.key == "Enter" ? onSubmitFindPassword() : false}
        placeholder="ID" />
      <input
        type="text"
        name="email"
        className="login-inp"
        value={findData.email}
        onChange={(e) => handleFindData(e)}
        onKeyDown={(e) => e.key == "Enter" ? onSubmitFindPassword() : false}
        placeholder="E-Mail" />
      <button
        type="button"
        className="login-btn"
        onClick={(e) => onSubmitFindPassword()}>Find password</button>
    </div>
  );
}

export default FindPassword;