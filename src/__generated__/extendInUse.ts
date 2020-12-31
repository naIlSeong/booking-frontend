/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ExtendInUseInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: extendInUse
// ====================================================

export interface extendInUse_extendInUse {
  __typename: "ExtendInUseOutput";
  ok: boolean;
  error: string | null;
}

export interface extendInUse {
  extendInUse: extendInUse_extendInUse;
}

export interface extendInUseVariables {
  input: ExtendInUseInput;
}
