/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetBookingInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getBooking
// ====================================================

export interface getBooking_getBooking_bookings_place_placeLocation {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
}

export interface getBooking_getBooking_bookings_place {
  __typename: "Place";
  id: number;
  placeName: string;
  placeLocation: getBooking_getBooking_bookings_place_placeLocation;
}

export interface getBooking_getBooking_bookings_team {
  __typename: "Team";
  id: number;
}

export interface getBooking_getBooking_bookings {
  __typename: "Booking";
  id: number;
  place: getBooking_getBooking_bookings_place;
  startAt: any;
  endAt: any;
  isFinished: boolean;
  inUse: boolean;
  canExtend: boolean;
  team: getBooking_getBooking_bookings_team | null;
}

export interface getBooking_getBooking {
  __typename: "GetBookingOutput";
  ok: boolean;
  error: string | null;
  bookings: getBooking_getBooking_bookings[] | null;
}

export interface getBooking {
  getBooking: getBooking_getBooking;
}

export interface getBookingVariables {
  input: GetBookingInput;
}
