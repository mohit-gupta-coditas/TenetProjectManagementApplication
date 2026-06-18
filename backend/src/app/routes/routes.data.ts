import authRoutes from "../feature-modules/auth/auth.routes.js";
import companyRoute from "../feature-modules/company/company.route.js";
import domainRoute from "../feature-modules/domain/domain.route.js";
import userRoute from "../feature-modules/user/user.route.js";
import type { Routes } from "./routes.types.js";

export const routes : Routes = [
  authRoutes,
  companyRoute,
  domainRoute,
  userRoute
];