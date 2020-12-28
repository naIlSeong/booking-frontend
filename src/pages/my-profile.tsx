import { gql, useQuery } from "@apollo/client";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { editTime } from "../hooks/useTime";
import { getFinishedBooking } from "../__generated__/getFinishedBooking";

const GET_FINISHED_BOOKING = gql`
  query getFinishedBooking {
    getFinishedBooking {
      ok
      error
      bookings {
        id
        startAt
        endAt
        place {
          id
          placeName
          placeLocation {
            id
            locationName
          }
        }
        team {
          id
          teamName
        }
      }
    }
  }
`;

export const MyProfile = () => {
  const history = useHistory();
  const { data, loading } = useMe();
  const {
    data: queryOutput,
    loading: queryLoading,
  } = useQuery<getFinishedBooking>(GET_FINISHED_BOOKING);

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - MyProfile</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="bookingList">
            <div className="flex justify-between items-center pb-8">
              <span className="title w-max pb-0">Your Profile</span>
              <button
                className="bg-coolGray-900 hover:bg-black transition-colors duration-500 text-coolGray-200 text-center  rounded-md px-3 py-2 font-medium"
                onClick={() => history.push("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
            <div className="text-coolGray-200 font-medium grid gap-2 my-4">
              {data?.me && (
                <>
                  <div> ∙ {data.me.username}</div>
                  <div>
                    {data.me.studentEmail === null
                      ? " ∙ No StudentEmail"
                      : ` ∙ ${data.me.studentEmail}`}
                  </div>
                  <div> ∙ {data.me.role}</div>
                  <div>
                    {data.me.team === null ? (
                      " ∙ No Team"
                    ) : (
                      <>
                        <span> ∙ </span>
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            history.push(`/team/${data.me.team?.id}`)
                          }
                        >
                          {data.me.team.teamName}
                        </span>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="bookingList">
          <div className="flex flex-col justify-between pb-8">
            <span className="title w-max">Finsished Booking</span>
            <div>
              {queryLoading ? (
                <div className="text-white text-2xl font-semibold tracking-wider w-auto my-4 text-center">
                  Loading...
                </div>
              ) : queryOutput?.getFinishedBooking.bookings?.length !== 0 ? (
                queryOutput?.getFinishedBooking.bookings?.map(
                  (booking, index) => (
                    <div className="bookingArgs" key={index}>
                      <div className="bookingTime">
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() => history.push(`/booking/${booking.id}`)}
                        >
                          {editTime(booking.startAt)} ~{" "}
                          {editTime(booking.endAt)}
                        </span>
                        {booking.team?.id && (
                          <span
                            className="px-2 ml-3 rounded-lg bg-coolGray-700 cursor-pointer"
                            onClick={() =>
                              history.push(`/team/${booking.team?.id}`)
                            }
                          >
                            With Team
                          </span>
                        )}
                      </div>
                      <div className="text-coolGray-400 pt-6 pb-2">
                        <FontAwesomeIcon
                          icon={faMapMarkerAlt}
                          className="text-coolGray-200"
                        />{" "}
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() =>
                            history.push(`/place/${booking.place.id}`)
                          }
                        >
                          {booking.place.placeName}
                        </span>
                        <span className="font-semibold text-coolGray-200">
                          {" "}
                          ∙{" "}
                        </span>
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() =>
                            history.push(
                              `/location/${booking.place.placeLocation.id}`
                            )
                          }
                        >
                          {booking.place.placeLocation.locationName}
                        </span>
                      </div>
                    </div>
                  )
                )
              ) : (
                <div className="flex flex-col items-center my-4">
                  <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                    There is no Booking :(
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
