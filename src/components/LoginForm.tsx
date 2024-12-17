import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import Alert, { AlertTypes } from "./UI/Alert";
import { useAppDispatch } from "../redux/store";
import { getUserCredentials } from "../redux/auth/authActions";
import useAuthSelector from "../redux/auth/authSelector";
import Spinner from "./UI/Spinner";
import "../assets/scss/login-form.scss";

type Props = {};

const schema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(3),
});

type FormData = z.infer<typeof schema>;

function LoginForm({}: Props) {
  const { authLoading:loading2, authError: authError2} = useAuthSelector();
 
  const dispatchX = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    // console.log("Data",data);
    // dispatch({ type: AuthActionKind.SET_LOADING, payload: true });
    try {
      // const userCredential = await login(data.email, data.password);
      // const userData = await getUserbyUUID(userCredential.user.uid); 

      // integration-test
      dispatchX(getUserCredentials(data)).unwrap();

      // dispatch({
      //   type: AuthActionKind.LOGIN,
      //   payload: { user: userCredential.user, role: userData?.role || "user" },
      // });
      // dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
    } catch (error: FirebaseError | any) {
      // console.error("Login error:", error.message); 
      // dispatch({ type: AuthActionKind.SET_LOADING, payload: false });
      // dispatch({
      //   type: AuthActionKind.SET_AUTH_ERROR,
      //   payload: "Invalid email or password",
      // });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-unit">
        <label htmlFor="email">E-mail</label>
        <input disabled={loading2} type="text" {...register("email")} />
        {errors.email && (
          <Alert type={AlertTypes.error} message={errors.email.message} />
        )}
      </div>
      <div className="input-unit">
        <label htmlFor="password">Password</label>
        <input disabled={loading2} type="password" {...register("password")} />
        {errors.password && (
          <Alert type={AlertTypes.error} message={errors.password.message} />
        )}
      </div>
      <div className="input-unit">
        <button disabled={loading2} type="submit">{loading2 ? <Spinner /> : "Login"}</button>
      </div>
      <div className="input-unit">
        {authError2 && <Alert type={AlertTypes.error} message={authError2} />}
      </div>
    </form>
  );
}

export default LoginForm;
