/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_team {
  __typename: "Team";
  id: number;
  teamName: string;
}

export interface meQuery_me {
  __typename: "User";
  id: number;
  username: string;
  role: UserRole;
  studentEmail: string | null;
  studentId: number | null;
  team: meQuery_me_team | null;
}

export interface meQuery {
  me: meQuery_me;
}
