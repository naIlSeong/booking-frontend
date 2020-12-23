import React from "react";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const onClick = () => isLoggedInVar(true);
  return (
    <div>
      <div>Please Log in</div>
      <button onClick={onClick}>Log in</button>
    </div>
  );
};
