let express = require('express');
let router = express.Router();

// Use the controller file to action
const RegisterNewUser = require('../controllers/registerNewUser.controller');

router.post('/', RegisterNewUser.create)

module.exports = router;