import React, { useEffect, useState } from "react";
import sha256 from "sha256";

import validater from "@helpers/validate.helper.js"

import { API } from "@components/axios";

const UserInfo = ({
  password
}) => {
  const [user, setUser] = useState({
    id: "",
    currentPassword: "",
    password: "",
    retryPassword: "",
    name: "",
    email: ""
  });

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    console.log(user);
  };

  const onClickUpdateUser = () => {
    if (validater.isEmpty(user.currentPassword)) {
      alert("현재 패스워드를 입력해주세요");
    } else if (!validater.isEmpty(user.password) && !validater.isPassword(user.password)) {
      alert("패스워드 형식에 맞게 입력해주세요\n두 종류 이상의 문자구성 및 8자리 이상으로 구성해주세요\n(알파벳 대/소문자, 숫자, 특수기호 \"$@!%*?&\")");
    } else if (!validater.isEmpty(user.password) && validater.isEmpty(user.retryPassword)) {
      alert("새로운 패스워드 확인을 입력해주세요");
    } else if (user.password !== user.retryPassword) {
      alert("새로운 패스워드가 일치하지 않습니다");
    } else if (validater.isEmpty(user.name)) {
      alert("이름을 입력해주세요");
    } else if (validater.isEmpty(user.email)) {
      alert("이메일을 입력해주세요");
    } else if (!validater.isEmail(user.email)) {
      alert("이메일을 형식에 맞게 입력해주세요");
    } else {
      let url = `/api/user/?currentPassword=${sha256(user.currentPassword)}&name=${user.name}&email=${user.email}`;
      if (user.password) { url += `&password=${sha256(user.password)}`; }
      API.put(url).then(res => {
        if (res.data.success) {
          alert(res.data.message);
          location.href = "/todo";
        }
      });
    }
  }

  useEffect(() => {
    const url = `/api/user/?password=${sha256(password)}`;
    API.get(url).then(res => {
      if (res.data.success) {
        setUser({
          ...user,
          id: res.data.user.id,
          name: res.data.user.name,
          email: res.data.user.email
        });
      }
    });
  }, []);

  useEffect(() => {}, [user]);

  return (
    user
    ? <div className="user-info">
      <dl>
        <dt>ID</dt>
        <dd className="id">{user.id}</dd>
        <dt>현재 패스워드</dt>
        <dd>
          <input
          type="password"
          name="currentPassword"
          value={user.currentPassword}
          onChange={handleUserData} />
        </dd>
        <dt>새로운 패스워드</dt>
        <dd>
          <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleUserData} />
        </dd>
        <dt>새로운 패스워드 확인</dt>
        <dd>
          <input
          type="password"
          name="retryPassword"
          value={user.retryPassword}
          onChange={handleUserData} />
        </dd>
        <dt>이름</dt>
        <dd>
          <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleUserData} />
        </dd>
        <dt>E-Mail</dt>
        <dd>
          <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleUserData} />
        </dd>
      </dl>
      <button
        type="button"
        onClick={onClickUpdateUser}>수정</button>
    </div>
    : null
  );
}


export default UserInfo;