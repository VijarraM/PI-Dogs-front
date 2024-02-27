const { Router } = require('express');
const findAll = require('../controllers/temperaments.controllers');

const router = Router();

router.get('/', findAll);

module.exports = router;
