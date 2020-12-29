import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authToken, LOCAL_STORAGE_TOKEN } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { login, loginVariables } from "../__generated__/login";
import { Helmet } from "react-helmet-async";

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

interface IForm {
  username: string;
  password: string;
}

export const Login = () => {
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

  const onCompleted = (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
      authToken(token);
      history.push("/");
      window.location.reload(false);
    }
  };

  const [loginMutation, { data: loginOutput, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN, { onCompleted });

  const onSubmint = () => {
    if (!loading) {
      const { username, password } = getValues();
      loginMutation({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="background flexBox">
      <Helmet>
        <title>Booking - Login</title>
      </Helmet>
      <div className="title">Welcome back!</div>
      <form className="grid gap-4 w-5/12" onSubmit={handleSubmit(onSubmint)}>
        <input
          ref={register({ required: "Required" })}
          name="username"
          type="text"
          className="input"
          placeholder="Username"
          autoFocus
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
        <Button
          canClick={formState.isValid}
          loading={loading}
          actionText="Login"
        />
        {loginOutput?.login.error && (
          <FormError errorMessage={loginOutput.login.error} />
        )}
      </form>
      <h5 className="pt-4 font-light text-white">
        New to Booking?
        <Link to="/signup" className="text-coolGray-300  hover:underline">
          {" "}
          Sign up
        </Link>
      </h5>
    </div>
  );
};
