const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  unArchiveAll,
} = require("../controllers/notes.controllers");
const router = require("express").Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/", updateNote);
router.put("/unArchiveAll", unArchiveAll);
// router.delete("/:id", deleteNote);

module.exports = router;
