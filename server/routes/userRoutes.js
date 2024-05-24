//This is for our user handler functions

import express from "express";
import { createUser, loginUser } from "../controllers/userControllers.js";

const router = express.Router();

// Create user - /create/user
router.post('/create/user', createUser);

// Login user - /login/user
router.post('/login/user', loginUser);

export default router;


