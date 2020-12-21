import React from "react"

import Aside from "@components/Aside"
import Header from "@components/Header"

const User = () => {
  return (
    <div className="container todoapp">
      <Aside />
      <Header />
      <div>User Page...</div>
    </div>
  );
}

export default User;