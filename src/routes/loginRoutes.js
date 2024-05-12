import { Router } from "express";
import LoginController from "../controllers/LoginController";

const router = new Router();

router.post("/login", LoginController.authenticateUser);
router.get("/check", LoginController.checkIfUserIsLoggedIn);

export default router;
