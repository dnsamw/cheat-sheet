import React from 'react'
import "../assets/scss/login-form.scss";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert, { AlertTypes } from "./UI/Alert";

type Props = {};

const schema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

function LoginForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-unit">
        <label htmlFor="username">Username</label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <Alert type={AlertTypes.error} message={errors.username.message} />
        )}
      </div>
      <div className="input-unit">
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <Alert type={AlertTypes.error} message={errors.password.message} />
        )}
      </div>
      <div className="input-unit">
        <button>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
