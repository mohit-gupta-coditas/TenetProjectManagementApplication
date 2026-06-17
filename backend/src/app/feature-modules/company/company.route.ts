import { customRouter } from "../../routes/custom.router.js";
import { uploadToS3 } from "../../utils/aws.helper.js";

const router = customRouter();

router.post(
  '/',
  {isPublic: true},
  uploadToS3.single('logo'),
  async (req, res, next) => {
    try {
      console.log(req.file);
    } catch(err) {
      next(err);
    }
  }
)

export default router.setRouter('/company');