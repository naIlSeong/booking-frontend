import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useTeam } from "../hooks/useTeam";
import { deleteTeam } from "../__generated__/deleteTeam";
import { editTeam, editTeamVariables } from "../__generated__/editTeam";
import { NotFound } from "./404";

const EDIT_TEAM = gql`
  mutation editTeam($input: EditTeamInput!) {
    editTeam(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_TEAM = gql`
  mutation deleteTeam {
    deleteTeam {
      ok
      error
    }
  }
`;

interface IState {
  id: number;
}
interface IForm {
  teamName: string;
}

export const EditTeam = () => {
  const history = useHistory();

  const {
    state: { id },
  } = useLocation<IState>();
  const { data, loading } = useTeam(id.toString());

  const { getValues, register, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
  });

  const [
    editTeamMutation,
    { data: editTeamOutput, loading: editTeamLoading },
  ] = useMutation<editTeam, editTeamVariables>(EDIT_TEAM, {
    onCompleted: (data: editTeam) => {
      const {
        editTeam: { ok },
      } = data;
      if (ok) {
        history.push(`/team/${id}`);
        window.location.reload(false);
      }
    },
  });

  const [
    deleteTeamMutation,
    { data: deleteTeamOutput, loading: deleteTeamLoading },
  ] = useMutation<deleteTeam>(DELETE_TEAM, {
    onCompleted: (data: deleteTeam) => {
      const {
        deleteTeam: { ok },
      } = data;
      if (ok) {
        history.push("/my-profile");
        window.location.reload(false);
      }
    },
  });

  const onSubmit = () => {
    if (!editTeamLoading) {
      const { teamName } = getValues();
      editTeamMutation({
        variables: {
          input: {
            teamName,
          },
        },
      });
    }
  };

  return !data ? (
    <NotFound />
  ) : (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Edit Team</title>
      </Helmet>
      <div className="title">
        <span>Edit Team</span>
      </div>
      <form className="grid gap-4 w-5/12" onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <div className="text-white text-2xl font-semibold tracking-wider w-auto my-4 text-center">
            Loading...
          </div>
        ) : (
          <>
            <input
              ref={register({
                required: true,
                validate: (value) => value !== "",
              })}
              name="teamName"
              type="text"
              className="input"
              placeholder="Team Name"
              defaultValue={data?.teamDetail.team?.teamName}
              autoFocus
            />
            <Button
              canClick={formState.isValid}
              loading={editTeamLoading}
              actionText="Update"
            />
            {editTeamOutput?.editTeam.error && (
              <FormError errorMessage={editTeamOutput.editTeam.error} />
            )}
          </>
        )}
      </form>
      <form className="grid gap-4 w-5/12">
        <button
          className="text-white font-semibold py-3 mt-20 focus:outline-none bg-red-700 hover:bg-red-900 transition-colors duration-500"
          onClick={() => {
            if (!deleteTeamLoading) {
              deleteTeamMutation({});
            }
          }}
          type="button"
        >
          {deleteTeamLoading ? "Loading..." : "Delete Team"}
        </button>
        {deleteTeamOutput?.deleteTeam.error && (
          <FormError errorMessage={deleteTeamOutput.deleteTeam.error} />
        )}
      </form>
    </div>
  );
};
