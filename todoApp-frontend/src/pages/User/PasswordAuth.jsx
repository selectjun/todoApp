import React from "react";

const PasswordAuth = ({
  password,
  onChangePassword,
  onClickPasswordAuth
}) => {
  return (
    <div className="password-auth">
      {/* <h4 className="sub-title">암호 확인</h4> */}
      <dl>
        <dt>
          <label htmlFor="">현재 패스워드</label>
        </dt>
        <dd>
          <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChangePassword}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClickPasswordAuth();
            }
          }} />
        </dd>
      </dl>
      <button
        type="button"
        onClick={onClickPasswordAuth}>확인</button>
    </div>
  );
}


export default PasswordAuth;