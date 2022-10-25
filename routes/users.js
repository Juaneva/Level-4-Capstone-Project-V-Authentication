let express = require('express');
let router = express.Router();

// Use the controller files to action
const DisplayUsers = require('../controllers/usersDisplay.controller');
const DeleteUser = require('../controllers/usersDelete.controller');
const EditUser = require('../controllers/usersEdit.controller')

router.get('/', DisplayUsers.display)
router.put('/', EditUser.update)
router.delete('/', DeleteUser.delete)

module.exports = router;