import { Router } from "express";
import upload from "../config/upload.js";
import {
  createLogo,
  deleteLogo,
  getLogo,
  getLogoById,
  setCurrentLogo,
  updateLogo,
} from "../controllers/logo.js";

const logoRouter = Router();

logoRouter.get("/", getLogo);
logoRouter.get("/:id", getLogoById);
logoRouter.post("/", upload.single("image"), createLogo);
logoRouter.put("/:id", upload.single("image"), updateLogo);
logoRouter.put("/current/:id", setCurrentLogo);
logoRouter.delete("/:id", deleteLogo);

export default logoRouter;
