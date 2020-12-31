/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateInUseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createInUse
// ====================================================

export interface createInUse_createInUse {
  __typename: "CreateInUseOutput";
  ok: boolean;
  error: string | null;
}

export interface createInUse {
  createInUse: createInUse_createInUse;
}

export interface createInUseVariables {
  input: CreateInUseInput;
}
