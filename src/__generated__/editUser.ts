/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editUser
// ====================================================

export interface editUser_editUser {
  __typename: "EditUserOutput";
  ok: boolean;
  error: string | null;
}

export interface editUser {
  editUser: editUser_editUser;
}

export interface editUserVariables {
  input: EditUserInput;
}
