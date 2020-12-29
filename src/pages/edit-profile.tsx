import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { authToken, LOCAL_STORAGE_TOKEN } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { deleteUser } from "../__generated__/deleteUser";
import { editUser, editUserVariables } from "../__generated__/editUser";

const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser {
      ok
      error
    }
  }
`;

interface IForm {
  username: string;
  password: string;
  studentId: number;
}

export const EditProfile = () => {
  const history = useHistory();
  const { data, loading } = useMe();
  const {
    getValues,
    register,
    errors,
    handleSubmit,
    formState,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onCompleted = (data: editUser) => {
    const {
      editUser: { ok },
    } = data;
    if (ok) {
      history.push("/my-profile");
      window.location.reload(false);
    }
  };

  const deleteOnCompleted = (data: deleteUser) => {
    const {
      deleteUser: { ok },
    } = data;
    if (ok) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      authToken(null);
      history.push("/logout");
      window.location.reload(false);
    }
  };

  const [
    editUserMutation,
    { data: editUserOutput, loading: editUserLoading },
  ] = useMutation<editUser, editUserVariables>(EDIT_USER, { onCompleted });

  const [
    deleteUserMutation,
    { data: deleteUserOutput, loading: deleteUserLoading },
  ] = useMutation<deleteUser>(DELETE_USER, { onCompleted: deleteOnCompleted });

  const onSubmit = () => {
    if (!editUserLoading) {
      const { username, password, studentId } = getValues();
      editUserMutation({
        variables: {
          input: {
            username: !username ? undefined : username,
            password: !password ? undefined : password,
            studentId: !studentId ? undefined : studentId,
          },
        },
      });
    }
  };

  const onClick = () => {
    if (!deleteUserLoading) {
      deleteUserMutation({});
    }
  };

  return (
    <div className="background flexBox h-screen">
      <Helmet>
        <title>Booking - Edit Profile</title>
      </Helmet>
      <div className="title">Edit Profile</div>
      <form className="grid gap-4 w-5/12" onSubmit={handleSubmit(onSubmit)}>
        {loading ? (
          <div className="text-white text-2xl font-semibold tracking-wider w-auto my-4 text-center">
            Loading...
          </div>
        ) : (
          <>
            {" "}
            <input
              ref={register({ required: false })}
              name="username"
              type="text"
              className="input"
              placeholder="Username  *optional"
              defaultValue={data?.me.username}
              autoFocus
            />
            <input
              ref={register({ required: false, minLength: 8 })}
              name="password"
              type="password"
              className="input"
              placeholder="Password   *optional"
            />
            {errors.password?.type === "minLength" && (
              <FormError errorMessage="Password should be more than or equal 8 chars" />
            )}
            <input
              ref={register({
                required: false,
                valueAsNumber: true,
                validate: (value) =>
                  !value || (value && value.toString().length === 6),
              })}
              name="studentId"
              type="text"
              className="input"
              placeholder="Student ID  *optional"
              defaultValue={data?.me.studentId ? data.me.studentId : ""}
            />
            {errors.studentId?.type === "validate" && (
              <FormError errorMessage="Student ID should be equal 6 numbers" />
            )}
            <Button
              canClick={formState.isValid}
              loading={editUserLoading}
              actionText="Update"
            />
          </>
        )}
        {editUserOutput?.editUser.error && (
          <FormError errorMessage={editUserOutput.editUser.error} />
        )}
        <button
          className="text-white font-semibold py-3 mt-12 focus:outline-none bg-red-700 hover:bg-red-900 transition-colors duration-500"
          onClick={onClick}
          type="button"
        >
          {deleteUserLoading ? "Loading..." : "Delete Account"}
        </button>
        {deleteUserOutput?.deleteUser.error && (
          <FormError errorMessage={deleteUserOutput.deleteUser.error} />
        )}
      </form>
    </div>
  );
};
