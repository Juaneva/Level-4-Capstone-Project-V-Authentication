let express = require('express');
let router = express.Router();

// Use the controller files to action
const DisplayPasswords = require('../controllers/credentialDisplay.controller');
const AddPassword = require('../controllers/credentialAdd.controller');
const EditPassword= require('../controllers/credentialEdit.controller');
const DeletePassword = require('../controllers/credentialDelete.controller');

router.get('/:data', DisplayPasswords.display)
router.post('/', AddPassword.create)
router.put('/', EditPassword.update)
router.delete('/', DeletePassword.delete)

module.exports = router;