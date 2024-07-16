import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  authenticatedRoutes,
  RouteInterface,
  unAuthenticatedRoutes,
} from "./routes";
import { Suspense } from "react";

function Router() {
  const isUserLoggedIn = true;

  const mapRoutes = (
    routesArr: Array<RouteInterface>,
    keyPrefix: "unAuth_" | "auth_"
  ) => {
    return (
      <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}>
        <Routes>
          {routesArr.map((route: any, i: number) => {
            const LazyComponent = route.element;
            return (
            <Route
              key={keyPrefix + i}
              path={route.path}
              element={<LazyComponent />}
            />
          )})}
        </Routes>
      </Suspense>
    );
  };

  return (
    <BrowserRouter>
      {isUserLoggedIn
        ? mapRoutes(authenticatedRoutes, "auth_")
        : mapRoutes(unAuthenticatedRoutes, "unAuth_")}
    </BrowserRouter>
  );
}
export default Router;
