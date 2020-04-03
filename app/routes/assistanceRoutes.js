/* eslint-disable new-cap */

const express = require('express');
const controller = require('../controllers/AssistanceController');

const router = express.Router();


router.get('/assistance', controller.getAll);

router.get('/assistance/id/:id', controller.getByID);

router.get('/assistance/name/:name', controller.getByName);


module.exports = router;
