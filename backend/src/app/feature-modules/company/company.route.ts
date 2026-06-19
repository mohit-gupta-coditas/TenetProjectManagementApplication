import { customRouter } from "../../routes/custom.router.js";
import { uploadToS3 } from "../../utils/aws.helper.js";
import { ResposneHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import companyService from "./company.service.js";
import { ZCompany, ZCompanyOptions, ZCompanyUpdate } from "./company.types.js";

const router = customRouter();

router.get(
  '/:id',
  {},
  params(ZCompany.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await companyService.getCompany({id: req.params.id as string});
      res.send(new ResposneHandler(result.toSafeJSON()));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  {},
  uploadToS3.single('logo'),
  body(ZCompany.pick({
    name: true,
    email: true,
    subscription: true
  })),
  async (req, res, next) => {
    try {
      const result = await companyService.createCompany(
        req.body, 
        (req.file as any).location,
        req.payload.userId
      );
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.get(
  '/',
  {},
  query(ZCompanyOptions),
  async (req, res, next) => {
    try {
      const result = await companyService.getAllCompanies(req.options);
      res.send(new ResposneHandler(result.map(company => company.toSafeJSON())));
    } catch(err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  {},
  params(ZCompany.pick({id: true})),
  body(ZCompanyUpdate),
  async (req, res, next) => {
    try {
      const result = await companyService.updateCompany(req.body, req.params.id as string);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  {},
  params(ZCompany.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await companyService.deleteCompany(req.params.id as string);
      res.send(new ResposneHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

// router.get(
//   '/',
  
// )

export default router.setRouter('/company');