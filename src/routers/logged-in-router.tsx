import React from "react";
import { authToken } from "../apollo";

export const LoggedInRouter = () => {
  const onClick = () => {
    localStorage.clear();
    window.location.reload();
    authToken();
  };
  return (
    <div>
      <div>Hola!!!!!</div>
      <button onClick={onClick}>Log Out</button>
    </div>
  );
};
