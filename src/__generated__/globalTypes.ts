/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Admin = "Admin",
  Individual = "Individual",
  Member = "Member",
  Representative = "Representative",
}

export interface BookingDetailInput {
  bookingId: number;
}

export interface CreateBookingInput {
  startAt: any;
  endAt: any;
  placeId: number;
  withTeam?: boolean | null;
}

export interface CreateInUseInput {
  placeId: number;
  withTeam?: boolean | null;
}

export interface CreateTeamInput {
  teamName: string;
}

export interface CreateUserInput {
  studentId?: number | null;
  username?: string | null;
  password?: string | null;
}

export interface DeleteBookingInput {
  bookingId: number;
}

export interface EditBookingInput {
  startAt?: any | null;
  endAt?: any | null;
  bookingId: number;
  placeId?: number | null;
  withTeam: boolean;
}

export interface EditTeamInput {
  teamName: string;
}

export interface EditUserInput {
  studentId?: number | null;
  username?: string | null;
  password?: string | null;
}

export interface ExtendInUseInput {
  bookingId: number;
}

export interface FinishInUseInput {
  bookingId: number;
}

export interface GetAvailablePlaceInput {
  locationId: number;
}

export interface GetBookingInput {
  placeId?: number | null;
  isInProgress?: boolean | null;
  isComingUp?: boolean | null;
  isFinished?: boolean | null;
}

export interface GetUserInput {
  userId: number;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface PlaceDetailInput {
  placeId: number;
}

export interface RegisterMemberInput {
  teamId: number;
}

export interface SearchPlaceInput {
  query: string;
}

export interface SearchTeamInput {
  query: string;
}

export interface TeamDetailInput {
  teamId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
