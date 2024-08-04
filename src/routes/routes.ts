// src/routes/routes.tsx

import { lazy, LazyExoticComponent, ComponentType } from "react";

export interface RouteInterface<T = {}> {
  path: string;
  element: LazyExoticComponent<ComponentType<T>>;
  props?: T;
}


const AuthPage = lazy(() => import("../pages/AuthPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const UserPage = lazy(() => import("../pages/UserPage"));

export const authenticatedRoutes: Array<RouteInterface> = [
  { path: "/", element: AdminPage },
];

export const unAuthenticatedRoutes: Array<RouteInterface> = [
  { path: "/", element: UserPage },
  { path: "/auth", element: AuthPage },
];
