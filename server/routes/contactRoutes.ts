import express from "express";

import {
  createContact,
  getContacts,
} from "../controllers/contactController";

const router = express.Router();

router.post("/", createContact);

router.get("/messages", getContacts);

export default router;