const router = require('express').Router();
const controller = require('../controllers/users');
// const validateReq = require('../middlewares/validator');

router.get('/users/me', controller.getUserInfo);
router.patch('/users/me', controller.updateUser);

// router.get('/users', controller.getUsers);
// router.get('/users/:id', validateReq.validateUserId, controller.getUserId);
// router.patch('/users/me/avatar', validateReq.validateAvatarUpdate, controller.updateAvatar);

module.exports = router;
