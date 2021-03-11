const router = require('express').Router();
const controller = require('../controllers/users');
const validateReq = require('../middlewares/validator');

router.get('/users/me', controller.getUserInfo);
router.patch('/users/me', validateReq.validateUserInfo, controller.updateUser);

module.exports = router;
