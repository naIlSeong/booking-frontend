import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedInRouter = () => {
  const onClick = () => isLoggedInVar(false);
  return (
    <div>
      <div>Hola!!!!!</div>
      <button onClick={onClick}>Log Out</button>
    </div>
  );
};
