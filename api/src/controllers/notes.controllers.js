const { Note, Category } = require("../db.js");

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.findAll({
      include: Category,
    });
    notes.length ? res.send(notes) : res.status(404).send("No notes found");
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({
      where: {
        id,
      },
      include: Category,
    });
    note ? res.send(note) : res.status(404).send("No note found");
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const createNote = async (req, res, next) => {
  const { title, body, category } = req.body;
  try {
    const note = await Note.create({
      title,
      body,
    });
    const catOk = await Category.findAll();
    if (catOk.length) {
      await note.addCategory(
        category.map((cat) => {
          const catFound = catOk.find((c) => c.name === cat);
          return catFound.id;
        })
      );
    }
    // else {
    //   await Category.create({
    //     name: category,
    //   });
    // }
    res.send(note);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  const { id, title, body, categoryId, archived, deleted } = req.body;
  try {
    const note = await Note.update(
      {
        title,
        body,
        archived,
        deleted,
      },
      {
        where: {
          id,
        },
      }
    );
    // console.log(note);
    note === 0
      ? res.status(404).send("No note found")
      : await Note.findOne({
          where: {
            id,
          },
          include: Category,
        })
          .then((note) => {
            // console.log(note);
            categoryId ? note.setCategories(categoryId) : null;
            res.send(note);
          })
          .catch((err) => {
            // console.log(err);
            next(err);
          });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const unArchiveAll = async (req, res, next) => {
  try {
    const notes = await Note.update(
      {
        archived: false,
      },
      {
        where: {
          archived: true,
        },
      }
    );
    notes === 0
      ? res.status(404).send("No notes found")
      : await Note.findAll({
          where: {
            archived: true,
          },
          include: Category,
        })
          .then((notes) => {
            // console.log(notes);
            res.send(notes);
          })
          .catch((err) => {
            // console.log(err);
            next(err);
          });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

// const deleteNote = async (req, res, next) => {
//   const { id } = req.params;
//   console.log(id);
//   try {
//     const note = await Note.destroy({
//       where: {
//         id,
//       },
//     });
//     // console.log(note);
//     note === 0
//       ? res.status(404).send("No note found")
//       : res.send("Note deleted");
//   } catch (err) {
//     // console.log(err);
//     next(err);
//   }
// };

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  unArchiveAll,
  // deleteNote,
};
