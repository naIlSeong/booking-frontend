/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BookingDetailInput, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: bookingDetail
// ====================================================

export interface bookingDetail_bookingDetail_booking_place_placeLocation {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
}

export interface bookingDetail_bookingDetail_booking_place {
  __typename: "Place";
  id: number;
  placeName: string;
  placeLocation: bookingDetail_bookingDetail_booking_place_placeLocation;
}

export interface bookingDetail_bookingDetail_booking_team {
  __typename: "Team";
  id: number;
  teamName: string;
}

export interface bookingDetail_bookingDetail_booking_creator {
  __typename: "User";
  id: number;
  username: string;
  role: UserRole;
}

export interface bookingDetail_bookingDetail_booking {
  __typename: "Booking";
  id: number;
  place: bookingDetail_bookingDetail_booking_place;
  team: bookingDetail_bookingDetail_booking_team | null;
  creator: bookingDetail_bookingDetail_booking_creator;
  startAt: any;
  endAt: any;
  inUse: boolean;
  isFinished: boolean;
}

export interface bookingDetail_bookingDetail {
  __typename: "BookingDetailOutput";
  ok: boolean;
  error: string | null;
  booking: bookingDetail_bookingDetail_booking | null;
}

export interface bookingDetail {
  bookingDetail: bookingDetail_bookingDetail;
}

export interface bookingDetailVariables {
  input: BookingDetailInput;
}
