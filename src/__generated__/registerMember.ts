/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterMemberInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: registerMember
// ====================================================

export interface registerMember_registerMember {
  __typename: "RegisterMemberOutput";
  ok: boolean;
  error: string | null;
}

export interface registerMember {
  registerMember: registerMember_registerMember;
}

export interface registerMemberVariables {
  input: RegisterMemberInput;
}
