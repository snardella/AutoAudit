import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new",
  "/users/new",
  "/examinees",
  "/examinees/:examineeId",
  "/exams/:examId",
  "/importar/:examId",
];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
