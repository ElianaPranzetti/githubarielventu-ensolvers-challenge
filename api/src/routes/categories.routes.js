const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
} = require("../controllers/categories.controllers.js");
const router = require("express").Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);

module.exports = router;
