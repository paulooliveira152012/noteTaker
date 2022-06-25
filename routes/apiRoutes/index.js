const router = require('express').Router();
const noteRoutes = require('../apiRoutes/notesRoutes');

router.use(noteRoutes);
router.use(require('./notesRoutes'))

module.exports = router