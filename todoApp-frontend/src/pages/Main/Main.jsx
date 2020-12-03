import React, { useEffect, useState } from "react";

import { API } from "@components/axios";

const Main = () => {
  const [todoList, setTodoList] = useState(0);

  useEffect(() => {
    API.get("/todo/").then(res => {
      setTodoList(res);
    }).catch(error => {
        console.log(error);
    });
  });

  return (
    <div>
      <h1>Main...</h1>
    </div>
  );
}

export default Main;