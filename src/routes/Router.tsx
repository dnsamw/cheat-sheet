// src/routes/Router.tsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { authenticatedRoutes, RouteInterface, unAuthenticatedRoutes } from "./routes";
import { Suspense } from "react";
import { useAuth } from "../contexts/authContext";
import AdminPage from "../pages/AdminPage";

function Router() {
  // const { state } = useAuth();  
  // const isUserLoggedIn = !!state?.user;

  return (
    <BrowserRouter>
      {/* <Suspense fallback={<div style={{ color: "white" }}>Loading...</div>}> */}
        <Routes>
          {/* {(isUserLoggedIn ? authenticatedRoutes : unAuthenticatedRoutes).map((route: RouteInterface, i: number) => {
            const LazyComponent = route.element;
            return (
              <Route
                key={`${isUserLoggedIn ? 'auth' : 'unauth'}_${i}`}
                path={route.path}
                element={<LazyComponent />}
              />
            );
          })} */}

              <Route
                path={'/'}
                element={<AdminPage />}
              />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}

export default Router;
