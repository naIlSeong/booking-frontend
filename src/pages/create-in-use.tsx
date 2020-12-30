import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { OtherButton } from "../components/button";
import {
  createInUse,
  createInUseVariables,
} from "../__generated__/createInUse";
import { useHistory } from "react-router-dom";
import { FormError } from "../components/form-error";
import { useAvailablePlace } from "../hooks/useAvailablePlace";
import { useLocation } from "../hooks/useLocation";

const CREAT_IN_USE = gql`
  mutation createInUse($input: CreateInUseInput!) {
    createInUse(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  placeId: number;
  withTeam: boolean | string;
  location: string;
  place: string;
}

export const CreateInUse = () => {
  const { register, getValues, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
  });

  const [
    getPlace,
    { data: getAvailablePlaceOutput, loading: getAvailablePlaceLoading },
  ] = useAvailablePlace(+getValues().location);

  const { data: getLocationOutput, loading } = useLocation();

  const history = useHistory();
  const onCompleted = (data: createInUse) => {
    const {
      createInUse: { ok },
    } = data;
    if (ok) {
      history.push("/");
      window.location.reload(false);
    }
  };

  const [
    createInUseMutation,
    { data: createInUseOutput, loading: createInUseLoading },
  ] = useMutation<createInUse, createInUseVariables>(CREAT_IN_USE, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!createInUseLoading) {
      const { place, withTeam } = getValues();
      if (withTeam === "withTeam") {
        createInUseMutation({
          variables: {
            input: {
              placeId: +place,
              withTeam: true,
            },
          },
        });
      }
      if (!withTeam) {
        createInUseMutation({
          variables: {
            input: {
              placeId: +place,
              withTeam: false,
            },
          },
        });
      }
    }
  };

  return (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Create In Use</title>
      </Helmet>
      {loading ? (
        <span className="loading">Loading...</span>
      ) : (
        <div className="flex flex-col justify-center items-center w-full min-h-full">
          <div className="bookingList">
            <span className="title w-max">Create In Use</span>
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
            {createInUseOutput?.createInUse.error && (
              <FormError errorMessage={createInUseOutput.createInUse.error} />
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
            {createInUseLoading && (
              <div className="flex w-full justify-center items-center text-xl text-coolGray-200 font-medium py-5">
                Loading...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
