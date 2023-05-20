const express = require("express");
const router = express.Router();
const { getAllCategories } = require("../controllers/categoryControllers");

router.get("/categories", getAllCategories);

module.exports = router;
