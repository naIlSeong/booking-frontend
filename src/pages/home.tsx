import React from "react";
import { gql, useQuery } from "@apollo/client";
import { getMyBookings } from "../__generated__/getMyBookings";
import { Link, useHistory } from "react-router-dom";

const GET_MY_BOOKINGS = gql`
  query getMyBookings {
    getMyBookings {
      ok
      error
      bookings {
        id
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        startAt
        endAt
        isFinished
        inUse
      }
    }
  }
`;

export const Home = () => {
  const { data, loading } = useQuery<getMyBookings>(GET_MY_BOOKINGS);
  const history = useHistory();

  return (
    <div className="background flexBox">
      {loading ? (
        <span className="text-white text-2xl font-semibold tracking-wider mb-48">
          Loading...
        </span>
      ) : data?.getMyBookings.bookings?.length === 0 ? (
        <div className="flex flex-col items-center mb-48">
          <span className="text-4xl text-coolGray-200 font-semibold tracking-wide mb-6">
            There is no Booking :(
          </span>
          <Link
            to="/create-booking"
            className="text-coolGray-300 hover:underline"
          >
            Create new booking &rarr;
          </Link>
        </div>
      ) : (
        <>
          <div className="bookingList">
            <span className="title w-auto">In progress</span>
            {data?.getMyBookings.bookings?.map((booking) =>
              booking.inUse === true && booking.isFinished === false ? (
                <div
                  className="w-full bg-coolGray-500 mb-7 rounded-sm cursor-pointer"
                  onClick={() => history.push(`/booking/${booking.id}`)}
                >
                  <div>
                    {booking.startAt} ~ {booking.endAt}
                  </div>
                  <div>
                    {booking.place.placeName} in{" "}
                    {booking.place.placeLocation.locationName}
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
          <div className="bookingList mt-10 mb-40">
            <span className="title w-auto">Coming up next</span>
            {data?.getMyBookings.bookings?.map((booking) =>
              booking.inUse === false ? (
                <div
                  className="w-full bg-coolGray-500 mb-7 rounded-sm cursor-pointer"
                  onClick={() => history.push(`/booking/${booking.id}`)}
                >
                  <div>
                    {booking.startAt} ~ {booking.endAt}
                  </div>
                  <div>
                    {booking.place.placeName} in{" "}
                    {booking.place.placeLocation.locationName}
                  </div>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
