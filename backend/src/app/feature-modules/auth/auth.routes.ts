import { customRouter } from "../../routes/custom.router.js";
import { ResposneHandler } from "../../utils/response.handler.js";
import { body } from "../../utils/validate.request.js";
import { ZUser } from "../user/user.types.js";
import { passwordAuth } from "./auth.middleware.js";
import authService from "./auth.service.js";
import { ZLogin, ZPassword } from "./auth.types.js";

const router = customRouter();

router.post(
  '/sendotp',
  {isPublic: true},
  body(ZUser.pick({email: true})),
  async (req, res, next) => {
    try {
      const result = await authService.sendOTP(req.body.email);
      console.log(result);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/verifyOTP',
  {isPublic: true},
  body(ZLogin),
  async (req, res, next) => {
    try {
      const result = await authService.verifyOTP(req.body.otp, req.body.email);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
)

router.post(
  '/setPassword',
  {isPublic : true},
  passwordAuth,
  body(ZPassword),
  async (req, res, next) => {
    try {
      const result = await authService.setPassword(req.body.password, req.payload.userId);
      res.send(new ResposneHandler(result));
    } catch(err) {
      console.log(err);
      next(err);
    }
  }
)

router.post(
  '/makePassword',
  {isPublic: true},
  body(ZLogin.pick({email: true})),
  async (req, res, next) => {
    try {
      const result = await authService.makePassword(req.body.email);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
)

export default router.setRouter('/auth');