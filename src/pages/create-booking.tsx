import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  createBooking,
  createBookingVariables,
} from "../__generated__/createBooking";
import { Helmet } from "react-helmet-async";
import { OtherButton } from "../components/button";
import { useHistory } from "react-router-dom";
import { useAvailablePlace } from "../hooks/useAvailablePlace";
import { useLocation } from "../hooks/useLocation";
import { FormError } from "../components/form-error";

const CREATE_BOOKING = gql`
  mutation createBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  withTeam: boolean | string;
  location: string;
  place: string;
  startAt: string;
  endAt: string;
}

export const CreateBooking = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    errors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [
    getPlace,
    { data: getAvailablePlaceOutput, loading: getAvailablePlaceLoading },
  ] = useAvailablePlace(+getValues().location);

  const { data: getLocationOutput, loading } = useLocation();

  const history = useHistory();
  const onCompleted = (data: createBooking) => {
    const {
      createBooking: { ok },
    } = data;
    if (ok) {
      history.push("/");
      window.location.reload(false);
    }
  };

  const [
    createBookingMutation,
    { data: createBookingOutput, loading: createBookingLoading },
  ] = useMutation<createBooking, createBookingVariables>(CREATE_BOOKING, {
    onCompleted,
  });

  const onSubmit = () => {
    const { place, withTeam, startAt, endAt } = getValues();
    if (withTeam === "withTeam") {
      createBookingMutation({
        variables: {
          input: {
            placeId: +place,
            withTeam: true,
            startAt,
            endAt,
          },
        },
      });
    }
    if (!withTeam) {
      createBookingMutation({
        variables: {
          input: {
            placeId: +place,
            withTeam: false,
            startAt,
            endAt,
          },
        },
      });
    }
  };

  return (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Create Booking</title>
      </Helmet>
      {loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title w-max">Create Booking</span>

            {/* Time */}
            <form className="">
              <div className="my-4">
                <label htmlFor="place-select" className="bookingTime text-2xl">
                  Start Time
                </label>
                <input
                  ref={register({
                    required: true,
                  })}
                  className="w-full p-2"
                  type="datetime-local"
                  name="startAt"
                />
              </div>
              <div className="my-4">
                <label htmlFor="place-select" className="bookingTime text-2xl">
                  End Time
                </label>
                <input
                  ref={register({
                    required: true,
                  })}
                  className="w-full p-2"
                  type="datetime-local"
                  name="endAt"
                />
              </div>
            </form>

            {/* Location */}
            <form>
              <div>
                <label
                  htmlFor="location-select"
                  className="bookingTime text-2xl"
                >
                  Location
                </label>
              </div>
              <div className="flex justify-between">
                <select
                  id="location-select"
                  name="location"
                  className="w-full mr-4"
                  ref={register({})}
                >
                  <option value="">=======Select Location=======</option>
                  {getLocationOutput?.getLocation.locations &&
                    getLocationOutput.getLocation.locations.map(
                      (location, index) => (
                        <option value={location.id} key={index}>
                          {location.locationName}
                        </option>
                      )
                    )}
                </select>
                <OtherButton
                  canClick={formState.isDirty}
                  actionText="Search!"
                  onClick={() => getPlace()}
                  type="button"
                />
              </div>
            </form>
            {getAvailablePlaceOutput?.getAvailablePlace.error && (
              <div className="my-4">
                <FormError
                  errorMessage={getAvailablePlaceOutput.getAvailablePlace.error}
                />
              </div>
            )}

            {/* Place */}
            <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="place-select" className="bookingTime text-2xl">
                Place
              </label>
              {getAvailablePlaceLoading ? (
                <div className="w-full text-center font-medium text-2xl text-coolGray-200">
                  Loading...
                </div>
              ) : (
                <div>
                  <div className="flex justify-between">
                    <select
                      id="place-select"
                      name="place"
                      className="w-full mr-4"
                      ref={register({})}
                    >
                      {getAvailablePlaceOutput?.getAvailablePlace.places ? (
                        <option value="">=====Select Place=====</option>
                      ) : (
                        <option value="">
                          =====Search Location First=====
                        </option>
                      )}

                      {getAvailablePlaceOutput?.getAvailablePlace.places &&
                        getAvailablePlaceOutput.getAvailablePlace.places?.map(
                          (place, index) => (
                            <option value={place.id} key={index}>
                              {place.placeName}
                            </option>
                          )
                        )}
                    </select>
                    <OtherButton
                      canClick={formState.isDirty}
                      actionText="Create!"
                      type="submit"
                    />
                  </div>
                </div>
              )}
            </form>
            {createBookingOutput?.createBooking.error && (
              <FormError
                errorMessage={createBookingOutput.createBooking.error}
              />
            )}

            <div className="flex w-full justify-end items-center text-xl text-coolGray-200 font-medium">
              <input
                ref={register()}
                type="checkbox"
                value="withTeam"
                className="mx-2"
                name="withTeam"
              />
              <label>With Team?</label>
            </div>
            {createBookingLoading && (
              <div className="flex w-full justify-center items-center text-xl text-coolGray-200 font-medium py-5">
                Loading...
              </div>
            )}
            {errors.startAt?.type === "required" && (
              <FormError errorMessage="Start time is required" />
            )}
            {errors.endAt?.type === "required" && (
              <FormError errorMessage="End time is required" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
