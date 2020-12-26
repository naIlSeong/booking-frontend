import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { useMe } from "../hooks/useMe";
import { editUser, editUserVariables } from "../__generated__/editUser";

// ToDo : editUser Mutation & onSubmit & onCompleted
const EDIT_USER = gql`
  mutation editUser($input: EditUserInput!) {
    editUser(input: $input) {
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
      editUser: { ok, error },
    } = data;
    if (ok) {
      // history.push("/my-profile");
      console.log(ok);
      console.log(error);
    }
  };

  const [
    editUserMutation,
    { data: editUserOutput, loading: editUserLoading },
  ] = useMutation<editUser, editUserVariables>(EDIT_USER, { onCompleted });

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
              loading={loading}
              actionText="Update"
            />
          </>
        )}
        {editUserOutput?.editUser.error && (
          <FormError errorMessage={editUserOutput.editUser.error} />
        )}
      </form>
    </div>
  );
};
