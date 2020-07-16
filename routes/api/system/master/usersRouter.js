const { route } = require('../../../web');
const User = require('../../../../models/user');
const UsersController = require('../../../../controllers/UsersController');


const router = require('express').Router();

router.get('/',UsersController.getUserById);



module.exports = router;