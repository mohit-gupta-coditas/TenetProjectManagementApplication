import { customRouter } from "../../routes/custom.router.js";
import { ResposneHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import { ZCompany } from "../company/company.types.js";
import domainService from "./domain.service.js";
import { ZDomain, ZDomainOptions } from "./domain.types.js";

const router = customRouter();

router.get(
  '/:id',
  {},
  params(ZDomain.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await domainService.getDomain({id: req.params.id as string});
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.get(
  '/',
  {},
  query(ZDomainOptions),
  body(ZDomain.pick({companyId: true})),
  async (req, res, next) => {
    try {
      const result = await domainService.getAllDomain(req.options, req.body.companyId);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  {},
  body(ZDomain.pick({
    name: true,
    companyId: true
  })),
  async (req, res, next) => {
    try {
      console.log('here');
      const result = await domainService.createDomain({...req.body, createdBy: req.payload.userId });
      res.send(new ResposneHandler(result));
    } catch(err) {
      console.log(err);
      next(err);
    }
  }
);

router.patch(
  '/:id',
  {},
  body(ZCompany.pick({
    name: true,
  })),
  async (req, res, next)=> {
    try {
      const result = await domainService.updateDomain(req.body, req.params.id as string);
      res.send(new ResposneHandler(result)); 
    } catch(err) {
      next(err);
    }
  }
)

router.delete(
  '/:id',
  {},
  params(ZDomain.pick({id: true})),
  async (req, res, next)=> {
    try {
      const result = await domainService.deleteDomain(req.params.id as string);
      res.send(new ResposneHandler(result)); 
    } catch(err) {
      next(err);
    }
  }
)

export default router.setRouter('/domain');