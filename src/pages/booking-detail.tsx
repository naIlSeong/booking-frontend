import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import {
  bookingDetail,
  bookingDetailVariables,
} from "../__generated__/bookingDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassEnd,
  faHourglassStart,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faUser,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import {
  deleteBooking,
  deleteBookingVariables,
} from "../__generated__/deleteBooking";
import { FormError } from "../components/form-error";
import { NotFound } from "./404";
import { useMe } from "../hooks/useMe";

const BOOKING_DETAIL = gql`
  query bookingDetail($input: BookingDetailInput!) {
    bookingDetail(input: $input) {
      ok
      error
      creator {
        id
        username
        role
      }
      booking {
        id
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
        startAt
        endAt
        inUse
        isFinished
      }
    }
  }
`;

const DELETE_BOOKING = gql`
  mutation deleteBooking($input: DeleteBookingInput!) {
    deleteBooking(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const BookingDetail = () => {
  const editTime = (rawDate: string) => {
    const [rawYear, month, ect] = rawDate.split("-");
    const year = rawYear.slice(0, 2);
    const day = ect.slice(0, 2);
    const [d, minute] = ect.split(":");
    const h = d.slice(3, 5);
    const hour = (parseInt(h) + 9).toString();

    return `${year}/${month}/${day} ${hour}:${minute}`;
  };

  const history = useHistory();
  const { id: bookingId } = useParams<IParams>();
  const { data: myData, loading: myLoading } = useMe();
  const { data, loading } = useQuery<bookingDetail, bookingDetailVariables>(
    BOOKING_DETAIL,
    {
      variables: {
        input: {
          bookingId: +bookingId,
        },
      },
    }
  );
  const [
    deleteBookingMutation,
    { data: deleteBookingOutput, loading: deleteBookingLoading },
  ] = useMutation<deleteBooking, deleteBookingVariables>(DELETE_BOOKING, {
    onCompleted: (data: deleteBooking) => {
      const {
        deleteBooking: { ok },
      } = data;
      if (ok) {
        history.push("/");
        window.location.reload(false);
      }
    },
  });

  return data?.bookingDetail.ok === false && data.bookingDetail.error ? (
    <NotFound />
  ) : (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Booking Detail</title>
      </Helmet>
      <div className="flex flex-col justify-center items-center w-full min-h-full">
        {loading ? (
          <span className="loading">Loading...</span>
        ) : (
          <div className="bookingList">
            <div className="flex items-center pb-8">
              <span className="title w-auto pb-0">Booking Info</span>
              {!myLoading &&
                myData &&
                data?.bookingDetail.creator?.id === myData.me.id && (
                  <>
                    {data.bookingDetail.booking?.isFinished === false &&
                    data.bookingDetail.booking.inUse === false ? (
                      <>
                        <span
                          className="text-coolGray-200 text-xl font-semibold px-7 py-1.5 ml-auto rounded-lg bg-coolGray-900 hover:bg-black transition-colors duration-500 cursor-pointer"
                          onClick={() => {
                            history.push(
                              `/edit-booking/${data?.bookingDetail.booking?.id}`
                            );
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className="text-coolGray-200 text-xl font-semibold px-4 py-1.5 ml-3 rounded-lg bg-red-700 hover:bg-red-900 transition-colors duration-500 cursor-pointer"
                          onClick={() => {
                            if (
                              !deleteBookingLoading &&
                              data?.bookingDetail.booking
                            ) {
                              deleteBookingMutation({
                                variables: {
                                  input: {
                                    bookingId: data.bookingDetail.booking.id,
                                  },
                                },
                              });
                            }
                          }}
                        >
                          {deleteBookingLoading ? "Loading" : "Delete"}
                        </span>
                      </>
                    ) : (
                      <span
                        className="text-coolGray-200 text-xl font-semibold px-4 py-1.5 ml-auto rounded-lg bg-red-700 hover:bg-red-900 transition-colors duration-500 cursor-pointer"
                        onClick={() => {
                          if (
                            !deleteBookingLoading &&
                            data?.bookingDetail.booking
                          ) {
                            deleteBookingMutation({
                              variables: {
                                input: {
                                  bookingId: data.bookingDetail.booking.id,
                                },
                              },
                            });
                          }
                        }}
                      >
                        {deleteBookingLoading ? "Loading" : "Delete"}
                      </span>
                    )}
                  </>
                )}
            </div>
            {data?.bookingDetail.booking && data.bookingDetail.creator && (
              <div className="text-coolGray-200 font-medium grid gap-2 my-4 text-xl">
                <div className="py-1">
                  <FontAwesomeIcon icon={faHourglassStart} /> Start Time :{" "}
                  {editTime(data.bookingDetail.booking.startAt)}
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faHourglassEnd} /> End Time :{" "}
                  {editTime(data.bookingDetail.booking.endAt)}
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faMapMarkedAlt} /> Location :{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      history.push(
                        `/location/${data.bookingDetail.booking?.place.placeLocation.id}`
                      )
                    }
                  >
                    {
                      data.bookingDetail.booking.place.placeLocation
                        .locationName
                    }
                  </span>
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Place :{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      history.push(
                        `/place/${data.bookingDetail.booking?.place.id}`
                      )
                    }
                  >
                    {data.bookingDetail.booking.place.placeName}
                  </span>
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faUser} /> Creator :{" "}
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      history.push(`/user/${data.bookingDetail.creator?.id}`)
                    }
                  >
                    {data.bookingDetail.creator.username}
                  </span>
                </div>
                <div className="py-1">
                  <FontAwesomeIcon icon={faUserFriends} /> Team :{" "}
                  <span
                    className={
                      data.bookingDetail.booking.team !== null
                        ? "cursor-pointer hover:underline"
                        : ""
                    }
                    onClick={() => {
                      if (data.bookingDetail.booking?.team !== null) {
                        history.push(
                          `/team/${data.bookingDetail.booking?.team?.id}`
                        );
                      }
                    }}
                  >
                    {data.bookingDetail.booking.team !== null
                      ? data.bookingDetail.booking.team.teamName
                      : "No Team"}
                  </span>
                </div>
              </div>
            )}
            {deleteBookingOutput?.deleteBooking.error && (
              <FormError
                errorMessage={deleteBookingOutput.deleteBooking.error}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
