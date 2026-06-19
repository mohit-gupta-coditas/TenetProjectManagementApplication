import { customRouter } from "../../routes/custom.router.js";
import { ResposneHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import userService from "./user.service.js";
import { ZUser, ZUserOptions, ZUserUpdate } from "./user.types.js";

const router = customRouter();

router.get(
  '/:id',
  {},
  params(ZUser.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await userService.getUser({id: req.params.id as string});
      res.send(new ResposneHandler(result.toSafeJSON()));
    } catch(err) {
      next(err);
    }
  }
);

router.get(
  '/',
  {},
  query(ZUserOptions),
  body(ZUser.pick({companyId: true})),
  async (req, res, next) => {
    try {
      const result = await userService.getAllUser(req.options, req.body.companyId);
      res.send(new ResposneHandler(result.map(user => user.toSafeJSON())));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  {},
  body(ZUser.pick({
    email: true,
    companyId: true
  })),
  async (req, res, next) => {
    try {
      const result = await userService.createUser({...req.body, createdBy: req.payload.userId });
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  {},
  body(ZUserUpdate),
  async (req, res, next)=> {
    try {
      const result = await userService.updateUser(req.body, req.params.id as string);
      res.send(new ResposneHandler(result)); 
    } catch(err) {
      next(err);
    }
  }
)

router.delete(
  '/:id',
  {},
  params(ZUser.pick({id: true})),
  async (req, res, next)=> {
    try {
      const result = await userService.deleteUser(req.params.id as string);
      res.send(new ResposneHandler(result)); 
    } catch(err) {
      next(err);
    }
  }
)

export default router.setRouter('/user');