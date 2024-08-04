import React from 'react'
import "../assets/scss/login-form.scss";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert, { AlertTypes } from "./UI/Alert";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/authContext';
import { auth, db } from '../config/firebaseConfig';

type Props = {};

const schema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

function LoginForm({}: Props) {
  const { dispatch } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    // console.log("Data",data);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      dispatch({ type: 'LOGIN', payload: { user: userCredential.user, role: userData?.role || 'user' } });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-unit">
        <label htmlFor="email">E-mail</label>
        <input type="text" {...register("email")} />
        {errors.email && (
          <Alert type={AlertTypes.error} message={errors.email.message} />
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
        <button type='submit'>Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
