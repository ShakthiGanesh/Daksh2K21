const {Router} = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Work = require('../models/work');
const upload = require('../aws');

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser());