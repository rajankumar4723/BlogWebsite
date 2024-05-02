import { Router } from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();
router.route('/add').post(register);

router.route('/me').get(isAuthenticated,getMyProfile);


// router.get("/me",isAuthenticated,getMyProfile);
router.route('/login').post(login);

router.route('/logout').get(logout);


// router.post("/login",login);

// router.get("/logout",logout);

// app.post('/all', (req, res) => {
//     res.send("All is Working");
// })
// app.put('/update', (req, res) => {
//     res.send("Update is successfully");
// })
// app.delete('/rem', (req, res) => {
//     res.send("Delete is successfully");
// })
export default router;