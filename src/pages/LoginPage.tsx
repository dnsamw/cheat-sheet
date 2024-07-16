import React from "react";
import MainLayout from "../layouts/MainLayout";
import LoginForm from "../components/LoginForm";

type Props = {};

function LoginPage({}: Props) {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}

export default LoginPage;
