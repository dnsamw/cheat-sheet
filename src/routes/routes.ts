// src/routes/routes.tsx

import { lazy, LazyExoticComponent, ComponentType } from "react";

export interface RouteInterface<T = {}> {
  path: string;
  element: LazyExoticComponent<ComponentType<T>>;
  props?: T;
}

const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));

export const authenticatedRoutes: Array<RouteInterface> = [
  {
    path: "/",
    element: AdminPage,
  },
];

export const unAuthenticatedRoutes: Array<RouteInterface> = [
  { path: "/login", element: LoginPage },
  { path: "/register", element: RegisterPage },
];
