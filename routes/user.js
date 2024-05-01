import { Router } from "express";
import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = Router();
router.post('/add', register);

router.get("/me",isAuthenticated,getMyProfile);


router.post("/login",login);

router.get("/logout",logout);

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