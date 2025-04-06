const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validator = require('validator');
const User = require ('../models/User');
const { auth, adminOnly } = require('../middleware/auth');

