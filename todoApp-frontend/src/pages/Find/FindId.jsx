import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { API } from "@components/axios";
import validater from "@helpers/validate.helper.js"

const FindId = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");

  const onSubmitFindId = () => {
    if (validater.isEmpty(email)) {
      alert("이메일을 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else if (!validater.isEmail(email)) {
      alert("이메일을 입력해주세요");
      document.getElementsByName("email")[0].focus();
    } else {
      const url = `/api/user/find/id/?email=${email}`;
      API.post(url).then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          history.push("/login");
        }
      });
    }
  };

  useEffect(() => { document.title = "Find ID | Todo App"; }, []);

  return (
    <div>
      <input
        type="text"
        name="email"
        className="login-inp"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => e.key == "Enter" ? onSubmitFindId() : false}
        placeholder="E-Mail" />
      <button
        type="button"
        className="login-btn"
        onClick={(e) => onSubmitFindId()}>Find ID</button>
    </div>
  );
}

export default FindId;