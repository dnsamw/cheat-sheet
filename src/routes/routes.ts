// src/routes/routes.tsx

import { lazy, LazyExoticComponent, ComponentType } from "react";

export interface RouteInterface<T = {}> {
  path: string;
  element: LazyExoticComponent<ComponentType<T>>;
  props?: T;
}


const AuthPage = lazy(() => import("../pages/AuthPage"));
const AdminPage = lazy(() => import("../pages/AdminPage"));
const GuestPage = lazy(() => import("../pages/GuestPage"));

export const authenticatedRoutes: Array<RouteInterface> = [
  { path: "/", element: AdminPage },
];

export const unAuthenticatedRoutes: Array<RouteInterface> = [
  { path: "/", element: GuestPage },
  { path: "/auth", element: AuthPage },
];
