const express = require("express");
const router = express.Router();

// Import router
const adminRouter = require("./admin");
const userRouter = require("./user");
const threadRouter = require("./thread");
const signRouter = require("./sign");
const profileRouter = require("./profile");
const replyRouter = require("./reply");
const questionRouter = require("./question");
const categoriesRouter = require("./category");
const { getAllCategories } = require("../controllers/categoryControllers");

// Route utama
router.get("/", (req, res) => {
  res.send("Selamat datang di halaman utama!");
});

// router.get('/admin/add', (req, res) => {
//     res.render('add-admin-form');
// })

// router.get('/user/add', (req, res) => {
// res.render('add-user-form');
// })

router.use("/", adminRouter);
router.use("/", userRouter);
router.use("/", threadRouter);
router.use("/", signRouter);
router.use("/", profileRouter);
router.use("/", replyRouter);
router.use("/", questionRouter);
router.use("/", getAllCategories);

module.exports = router;
