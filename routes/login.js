let express = require('express');
let router = express.Router();

// Use the controller file to action
const LoginUser = require('../controllers/userLogin.controller')

router.post('/', LoginUser.login)

module.exports = router;