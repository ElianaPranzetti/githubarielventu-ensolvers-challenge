const { Category } = require("../db.js");
const defaultCategories = require("../data/categories.json");

// Push the default categories to the database
const createDefaultCategories = async () => {
  try {
    await Category.bulkCreate(defaultCategories);
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    categories.length
      ? res.send(categories)
      : res.status(404).send("No categories found");
  } catch (err) {
    next(err);
  }
};

const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({
      where: {
        id,
      },
    });
    category ? res.send(category) : res.status(404).send("No category found");
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
    });
    res.send(category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  const { id, name } = req.body;
  try {
    const category = await Category.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );
    category ? res.send(category) : res.status(404).send("No category found");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDefaultCategories,
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
};
