
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { createDefaultCategories } = require('./src/controllers/categories.controllers.js');

conn.sync({ force: false }).then(() => {
  createDefaultCategories(); // create default categories in the database
}).then(() => {
    server.listen(process.env.PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
