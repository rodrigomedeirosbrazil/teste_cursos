const express = require('express');
const router = express.Router();
const courseController = require('../app/api/controllers/courses');
const validateUser = require('../config/validateUser');

router.post('/subscribe', validateUser, courseController.subscribe);
router.get('/', courseController.getAll);
router.post('/', validateUser, courseController.create);
router.get('/:courseId', validateUser, courseController.getById);
router.put('/:courseId', validateUser, courseController.updateById);
router.delete('/:courseId', validateUser, courseController.deleteById);

module.exports = router;