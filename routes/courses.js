const express = require('express');
const router = express.Router();
const courseController = require('../app/api/controllers/courses');
const authMiddleware = require('../config/auth.js');

router.post('/subscribe', authMiddleware, courseController.subscribe);
router.post('/is_subscribe', authMiddleware, courseController.subscribe);
router.get('/', courseController.getAll);
router.post('/', authMiddleware, courseController.create);
router.get('/:courseId', authMiddleware, courseController.getById);
router.put('/:courseId', authMiddleware, courseController.updateById);
router.delete('/:courseId', authMiddleware, courseController.deleteById);

module.exports = router;