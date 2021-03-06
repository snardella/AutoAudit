import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import examineesRouter from "./api/v1/examineesRouter.js";
import examsRouter from "./api/v1/examsRouter.js";
import accountsReceivablesRouter from "./api/v1/accountsReceivablesRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); //place your server-side routes here
rootRouter.use("/api/v1/examinees", examineesRouter);
rootRouter.use("/api/v1/exams", examsRouter);
rootRouter.use("/api/v1/accountsreceivables", accountsReceivablesRouter);

export default rootRouter;
