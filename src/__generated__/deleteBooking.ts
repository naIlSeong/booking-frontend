/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBookingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteBooking
// ====================================================

export interface deleteBooking_deleteBooking {
  __typename: "DeleteBookingOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteBooking {
  deleteBooking: deleteBooking_deleteBooking;
}

export interface deleteBookingVariables {
  input: DeleteBookingInput;
}
