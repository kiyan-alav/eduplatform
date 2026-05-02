import { Router } from "express";
import { authController } from "../controllers/AuthController";
import { authGuard } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post(
  "/register",
  asyncHandler((req, res) => authController.register(req, res)),
);
router.post(
  "/login",
  asyncHandler((req, res) => authController.login(req, res)),
);
router.get(
  "/me",
  authGuard,
  asyncHandler((req, res) => authController.me(req, res)),
);

export default router;
