import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { createUser, createUserVariables } from "../__generated__/createUser";
import { Helmet } from "react-helmet-async";

const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
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

export const Signup = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState,
    errors,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const history = useHistory();

  const onCompleted = (data: createUser) => {
    const {
      createUser: { ok },
    } = data;
    if (ok) {
      history.push("/");
    }
  };

  const [createUserMutation, { data: createUserOutput, loading }] = useMutation<
    createUser,
    createUserVariables
  >(CREATE_USER, { onCompleted });

  const onSubmint = () => {
    if (!loading) {
      const { username, password, studentId } = getValues();
      if (!studentId) {
        createUserMutation({
          variables: {
            input: {
              username,
              password,
            },
          },
        });
      } else {
        createUserMutation({
          variables: {
            input: {
              username,
              password,
              studentId,
            },
          },
        });
      }
    }
  };

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Signup</title>
      </Helmet>
      <div className="title">Let's get started!</div>
      <form className="grid gap-4 w-5/12" onSubmit={handleSubmit(onSubmint)}>
        <input
          ref={register({ required: "Required" })}
          name="username"
          type="text"
          className="input"
          placeholder="Username"
        />
        {errors.username?.message && (
          <FormError errorMessage={errors.username.message} />
        )}
        <input
          ref={register({ required: "Required", minLength: 8 })}
          name="password"
          type="password"
          className="input"
          placeholder="Password"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password.message} />
        )}
        {errors.password?.type === "minLength" && (
          <FormError errorMessage="Password should be more than or equal 8 chars" />
        )}
        <input
          ref={register({
            valueAsNumber: true,
            validate: (value) =>
              !value || (value && value.toString().length === 6),
          })}
          name="studentId"
          type="text"
          className="input"
          placeholder="Student ID  *optional"
        />
        {errors.studentId?.type === "validate" && (
          <FormError errorMessage="Student ID should be equal 6 numbers" />
        )}
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Sign Up"
        />
        {createUserOutput?.createUser.error && (
          <FormError errorMessage={createUserOutput.createUser.error} />
        )}
      </form>
      <h5 className="pt-4 font-light text-white">
        Already have an account?
        <Link to="/" className="text-coolGray-300  hover:underline">
          {" "}
          Login
        </Link>
      </h5>
    </div>
  );
};
