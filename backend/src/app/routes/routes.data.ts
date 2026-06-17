import authRoutes from "../feature-modules/auth/auth.routes.js";
import companyRoute from "../feature-modules/company/company.route.js";
import type { Routes } from "./routes.types.js";

export const routes : Routes = [
  authRoutes,
  companyRoute
];