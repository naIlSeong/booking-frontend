import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}
interface IOtherButtonProps {
  canClick: boolean;
  actionText: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`text-white font-semibold py-3 mt-3 focus:outline-none ${
      canClick
        ? "bg-indigo-600 hover:bg-indigo-800 transition-colors duration-500"
        : "bg-gray-500 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);

export const OtherButton: React.FC<IOtherButtonProps> = ({
  canClick,
  actionText,
  onClick,
  type,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-auto text-coolGray-200 text-center  rounded-md px-3 py-2 font-medium ${
      canClick
        ? "bg-coolGray-900 hover:bg-black transition-colors duration-500"
        : "bg-gray-500 pointer-events-none"
    }`}
  >
    {actionText}
  </button>
);
