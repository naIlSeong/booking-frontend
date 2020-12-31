/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface createUser {
  createUser: createUser_createUser;
}

export interface createUserVariables {
  input: CreateUserInput;
}
