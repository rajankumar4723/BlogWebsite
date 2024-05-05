import { Router } from "express";
import { addblog, deleteblog, getMyAllPost } from "../controllers/blog.js";
import { upload } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
const router = Router();

router.route('/add').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },

    ]),
    isAuthenticated, addblog);


router.route('/getMyPost').get(isAuthenticated, getMyAllPost);

router.route('/:id').delete(deleteblog);


export default router;