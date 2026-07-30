import { Route } from "react-router-dom";

import { PublicLayout } from "@/layouts";

import { LandingPage } from "@/modules/landing/pages/LandingPage";
import { LoginPage } from "@/modules/auth/pages/LoginPage";

export const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />
  </Route>
);