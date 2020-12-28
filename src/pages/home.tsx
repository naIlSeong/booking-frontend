import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Countdown from "react-countdown";
import {
  extendInUse,
  extendInUseVariables,
} from "../__generated__/extendInUse";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import {
  finishInUse,
  finishInUseVariables,
} from "../__generated__/finishInUse";
import { editTime, renderer } from "../hooks/useTime";
import {
  useMyComingUpBooking,
  useMyInProgressBooking,
} from "../hooks/useConditionalBooking";

const EXTEND_IN_USE = gql`
  mutation extendInUse($input: ExtendInUseInput!) {
    extendInUse(input: $input) {
      ok
      error
    }
  }
`;

const FINISH_IN_USE = gql`
  mutation finishInUse($input: FinishInUseInput!) {
    finishInUse(input: $input) {
      ok
      error
    }
  }
`;

export const Home = () => {
  const {
    data: inProgress,
    loading: inProgressLoading,
  } = useMyInProgressBooking();

  const { data: comingUp, loading: comingUpLoading } = useMyComingUpBooking();

  const onCompleted = (data: extendInUse) => {
    const {
      extendInUse: { ok },
    } = data;
    if (ok) {
      window.location.reload(false);
    }
  };

  const [
    extendInUseMutation,
    { data: extendInUseOutput, loading },
  ] = useMutation<extendInUse, extendInUseVariables>(EXTEND_IN_USE, {
    onCompleted,
  });

  const [
    finishInUseMutation,
    { data: finishInUseOutput, loading: finishInUseLoading },
  ] = useMutation<finishInUse, finishInUseVariables>(FINISH_IN_USE, {
    onCompleted: (data: finishInUse) => {
      const {
        finishInUse: { ok },
      } = data;
      if (ok) {
        window.location.reload(false);
      }
    },
  });

  const history = useHistory();

  const onClickExtend = (bookingId: number) => {
    if (!loading) {
      extendInUseMutation({
        variables: {
          input: {
            bookingId,
          },
        },
      });
    }
  };

  setInterval(() => window.location.reload(false), 300000);

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking</title>
      </Helmet>
      {inProgressLoading && comingUpLoading ? (
        <span className="loading">Loading...</span>
      ) : (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title w-max">In progress</span>
            {extendInUseOutput?.extendInUse.error && (
              <div className="pb-5 flex justify-center">
                <FormError errorMessage={extendInUseOutput.extendInUse.error} />
              </div>
            )}
            {inProgress?.getBooking.bookings?.length !== 0 ? (
              inProgress?.getBooking.bookings?.map((booking, index) => (
                <div className="bookingArgs" key={index}>
                  <div className="bookingTime">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/booking/${booking.id}`)}
                    >
                      {editTime(booking.startAt)} ~ {editTime(booking.endAt)}
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
                    <span
                      className="px-2 ml-auto rounded-lg bg-red-700 hover:bg-red-900 transition-colors duration-500 cursor-pointer"
                      onClick={() => {
                        if (!finishInUseLoading) {
                          finishInUseMutation({
                            variables: { input: { bookingId: booking.id } },
                          });
                        }
                      }}
                    >
                      {finishInUseLoading ? "Loading" : "Finish"}
                    </span>
                  </div>
                  {finishInUseOutput?.finishInUse.error && (
                    <FormError
                      errorMessage={finishInUseOutput.finishInUse.error}
                    />
                  )}
                  <div className="mb-4 w-auto flex items-center">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-coolGray-200"
                    />{" "}
                    <Countdown date={booking.endAt} renderer={renderer} />
                    {booking.canExtend === true ? (
                      <span
                        className="text-red-600 font-bold cursor-pointer hover:underline ml-auto px-1"
                        onClick={() => onClickExtend(booking.id)}
                      >
                        Extend!
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="text-coolGray-400 py-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-coolGray-200"
                    />{" "}
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/place/${booking.place.id}`)}
                    >
                      {booking.place.placeName}
                    </span>
                    <span className="font-semibold text-coolGray-200"> ∙ </span>
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
              ))
            ) : (
              <div className="flex flex-col items-center mb-12 mt-4">
                <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                  There is no Booking :(
                </span>
                <Link
                  to="/create-in-use"
                  className="text-coolGray-300 font-light hover:underline"
                >
                  Create inUse booking &rarr;
                </Link>
              </div>
            )}
          </div>
          <div className="bookingList">
            <span className="title w-auto">Coming up next</span>
            {comingUp?.getBooking.bookings?.length !== 0 ? (
              comingUp?.getBooking.bookings?.map((booking, index) => (
                <div className="bookingArgs" key={index}>
                  <div className="bookingTime">
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/booking/${booking.id}`)}
                    >
                      {editTime(booking.startAt)} ~ {editTime(booking.endAt)}
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
                  <div className="text-coolGray-400 py-2">
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="text-coolGray-200"
                    />{" "}
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => history.push(`/place/${booking.place.id}`)}
                    >
                      {booking.place.placeName}
                    </span>
                    <span className="font-semibold text-coolGray-200"> ∙ </span>
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
              ))
            ) : (
              <div className="flex flex-col items-center mb-12 mt-4">
                <span className="text-3xl text-coolGray-200 font-semibold tracking-wide mb-6">
                  There is no Booking :(
                </span>
                <Link
                  to="/create-booking"
                  className="text-coolGray-300 font-light hover:underline"
                >
                  Create new booking &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
