import "../assets/scss/login-form.scss";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert, { AlertTypes } from "./UI/Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../contexts/authContext";
import { auth, db } from "../config/firebaseConfig";
import { AuthActionKind } from "../types/auth";
import { FirebaseError } from "firebase/app";
import Spinner from "./UI/Spinner";
import { getUserbyUUID, login } from "../services/firestoreService";

type Props = {};

const schema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

function LoginForm({}: Props) {
  const { state:{authError,loading}, dispatch } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    // console.log("Data",data);
    dispatch({ type: AuthActionKind.SET_LOADING, payload: true });
    try {
      const userCredential = await login(data.email, data.password);
      const userData = await getUserbyUUID(userCredential.user.uid);
      dispatch({
        type: AuthActionKind.LOGIN,
        payload: { user: userCredential.user, role: userData?.role || "user" },
      });
      dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
    } catch (error: FirebaseError | any) {
      // console.error("Login error:", error.message); 
      dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
      dispatch({
        type: AuthActionKind.SET_AUTH_ERROR,
        payload: "Invalid email or password",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-unit">
        <label htmlFor="email">E-mail</label>
        <input disabled={loading} type="text" {...register("email")} />
        {errors.email && (
          <Alert type={AlertTypes.error} message={errors.email.message} />
        )}
      </div>
      <div className="input-unit">
        <label htmlFor="password">Password</label>
        <input disabled={loading} type="password" {...register("password")} />
        {errors.password && (
          <Alert type={AlertTypes.error} message={errors.password.message} />
        )}
      </div>
      <div className="input-unit">
        <button disabled={loading} type="submit">{loading ? <Spinner /> : "Login"}</button>
      </div>
      <div className="input-unit">
        {authError && <Alert type={AlertTypes.error} message={authError} />}
      </div>
    </form>
  );
}

export default LoginForm;
