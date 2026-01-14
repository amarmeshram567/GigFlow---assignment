const express = require("express");
const { getGigs, createGig } = require("../controllers/gig.controller");
const { protect } = require("../middleware/auth.middleware");

const gigRouter = express.Router();


gigRouter.post("/", protect, createGig);
gigRouter.get("/", protect, getGigs)


module.exports = gigRouter