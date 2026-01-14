const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const { submitBid, getBidsForGig, hireBid } = require("../controllers/bid.controller");

const bidRouter = express.Router();


bidRouter.post("/", protect, submitBid);
bidRouter.get("/:gigId", protect, getBidsForGig);
bidRouter.patch("/:bidId/hire", protect, hireBid)


module.exports = bidRouter