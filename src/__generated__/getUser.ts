/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetUserInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_getUser_user_team {
  __typename: "Team";
  id: number;
  teamName: string;
}

export interface getUser_getUser_user {
  __typename: "User";
  id: number;
  username: string;
  role: UserRole;
  team: getUser_getUser_user_team | null;
}

export interface getUser_getUser {
  __typename: "GetUserOutput";
  ok: boolean;
  error: string | null;
  user: getUser_getUser_user | null;
}

export interface getUser {
  getUser: getUser_getUser;
}

export interface getUserVariables {
  input: GetUserInput;
}
