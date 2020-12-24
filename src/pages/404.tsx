import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="background flexBox h-screen">
      <h1 className="text-9xl text-coolGray-200 font-bold tracking-wide">
        404
      </h1>
      <h4 className="text-3xl text-coolGray-200 font-semibold pb-6 tracking-wide">
        Not Found :(
      </h4>
      <h6 className="py-2 text-coolGray-300">
        Sorry, but the page you are looking for is not found.{" "}
      </h6>
      <Link to="/" className="text-coolGray-400 hover:underline">
        Home &rarr;
      </Link>
    </div>
  );
};
