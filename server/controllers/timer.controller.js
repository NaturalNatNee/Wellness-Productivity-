const express = require('express');
const router = express.Router();
const {
    postTimer,
    putTimer, 
    getTimer,
    deleteTimer,
} = require('./timer.controller');

router.post('/timer', postTimer);