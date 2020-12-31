/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PlaceDetailInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: placeDetail
// ====================================================

export interface placeDetail_placeDetail_place_placeLocation {
  __typename: "PlaceLocation";
  id: number;
  locationName: string;
}

export interface placeDetail_placeDetail_place_bookings_team {
  __typename: "Team";
  id: number;
  teamName: string;
}

export interface placeDetail_placeDetail_place_bookings {
  __typename: "Booking";
  id: number;
  team: placeDetail_placeDetail_place_bookings_team | null;
  startAt: any;
  endAt: any;
  inUse: boolean;
  isFinished: boolean;
}

export interface placeDetail_placeDetail_place {
  __typename: "Place";
  id: number;
  placeName: string;
  isAvailable: boolean;
  inUse: boolean;
  placeLocation: placeDetail_placeDetail_place_placeLocation;
  bookings: placeDetail_placeDetail_place_bookings[] | null;
}

export interface placeDetail_placeDetail {
  __typename: "PlaceDetailOutput";
  ok: boolean;
  error: string | null;
  place: placeDetail_placeDetail_place | null;
}

export interface placeDetail {
  placeDetail: placeDetail_placeDetail;
}

export interface placeDetailVariables {
  input: PlaceDetailInput;
}
