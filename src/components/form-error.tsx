import React from "react";

interface IErrorMessage {
  errorMessage: string;
}

export const FormError: React.FC<IErrorMessage> = ({ errorMessage }) => (
  <span className="errorMessage">{errorMessage}</span>
);
