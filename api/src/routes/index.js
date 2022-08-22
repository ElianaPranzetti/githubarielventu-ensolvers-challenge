const { Router } = require('express');
const notesRouter = require('./notes.routes.js');
const categoriesRouter = require('./categories.routes.js');

const router = Router();

router.use('/notes', notesRouter);
router.use('/categories', categoriesRouter);

router.get('/', (req, res) => { 
    res.send('GET Home')
})


module.exports = router;
