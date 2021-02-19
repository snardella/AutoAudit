import express from "express";
import objection from "objection";

import AccountsReceivable from "../../../models/AccountsReceivable.js";

const accountsReceivablesRouter = new express.Router();

accountsReceivablesRouter.get("/", async (req, res) => {
  try {
    const accountsReceivables = await AccountsReceivable.query();
    return res.status(200).json({ accountsReceivables: accountsReceivables });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default accountsReceivablesRouter;
