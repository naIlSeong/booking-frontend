import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { createTeam, createTeamVariables } from "../__generated__/createTeam";
import { NotFound } from "./404";

const CREATE_TEAM = gql`
  mutation createTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  teamName: string;
}

export const CreateTeam = () => {
  const history = useHistory();
  const { data, loading } = useMe();
  const { getValues, register, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
  });
  const [
    createTeamMutation,
    { data: createTeamOutput, loading: createTeamLoading },
  ] = useMutation<createTeam, createTeamVariables>(CREATE_TEAM, {
    onCompleted: (data: createTeam) => {
      const {
        createTeam: { ok },
      } = data;
      if (ok) {
        history.push("/my-profile");
        window.location.reload(false);
      }
    },
  });

  const onSubmit = () => {
    if (!createTeamLoading) {
      const { teamName } = getValues();
      createTeamMutation({
        variables: {
          input: {
            teamName,
          },
        },
      });
    }
  };

  return !loading && data && data.me.team ? (
    <NotFound />
  ) : (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Create Team</title>
      </Helmet>
      <div className="title">
        <span>Create Team</span>
      </div>
      <form className="grid gap-4 w-5/12" onSubmit={handleSubmit(onSubmit)}>
        <input
          ref={register({
            required: true,
            validate: (value) => value !== "",
          })}
          name="teamName"
          type="text"
          className="input"
          placeholder="Team Name"
        />
        <Button
          canClick={formState.isValid}
          loading={createTeamLoading}
          actionText="Create"
        />
        {createTeamOutput?.createTeam.error && (
          <FormError errorMessage={createTeamOutput.createTeam.error} />
        )}
      </form>
    </div>
  );
};
