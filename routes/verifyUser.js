let express = require('express');
let router = express.Router();

// Use the controller files to action
const VerifyUser = require('../controllers/userJWTVerify.controller')

router.get('/', VerifyUser.verify)

module.exports = router;