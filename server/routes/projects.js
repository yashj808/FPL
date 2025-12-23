const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectDetails);

module.exports = router;
