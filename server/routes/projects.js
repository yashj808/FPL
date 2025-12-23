const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/', projectController.createProject);
router.get('/:id', projectController.getProjectDetails);
router.get('/:id/invite', projectController.generateInvite);
router.post('/join', projectController.joinProject);

module.exports = router;
