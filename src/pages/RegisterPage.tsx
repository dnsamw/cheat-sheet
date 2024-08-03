import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import '../assets/scss/login-reg-page.scss';
import MatrixWrapper from "../components/Experimental/MatrixWrapper";

type Props = {};

enum FormTypes {
  LOGIN = "login",
  REGISTER = "register",
}

function LoginPage({}: Props) {

  const [formType, setFormType] = useState<FormTypes>(FormTypes.LOGIN);

  return (
    <MainLayout>
      <MatrixWrapper />
    <div className="login-page-wrapper">
      <div className="controls">
        <button
          className={formType === FormTypes.LOGIN ? "active" : ""}
          onClick={() => setFormType(FormTypes.LOGIN)}
        >
          Login
        </button>
        <button
          className={formType === FormTypes.REGISTER ? "active" : ""}
          onClick={() => setFormType(FormTypes.REGISTER)}
        >
          Register
        </button>
      </div>
      <div>
      {formType === FormTypes.LOGIN && <LoginForm />}
      {formType === FormTypes.REGISTER && <RegisterForm />}
      </div>
    </div>
    </MainLayout>
  );
}

export default LoginPage;