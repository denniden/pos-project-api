const router = require('express').Router();
const { userController } = require('../controllers');
const {
  multerBlobUploader,
  multerErrorHandler,
} = require('../middlewares/multers');
const userValidator = require('../middlewares/validators/user.validator');

// POST register user
router.post(
  '/',
  multerBlobUploader().single('image'),
  multerErrorHandler,
  userValidator.registerUser,
  userController.registerUser
);

// POST login user
router.post('/auth', userController.loginUser);

// GET all user
router.get('/', userController.getAllUser);

// GET user by Id
router.get('/user/:id', userValidator.getUserById, userController.getUserById);

// PATCH user by userId
router.patch(
  '/:id',
  multerBlobUploader().single('image'),
  multerErrorHandler,
  userValidator.editUserByIdWithParams,
  userController.editUserById,
  userValidator.editUserById
);

// DELETE user by userId
router.delete(
  '/:id',
  userValidator.deleteUserByIdWithParams,
  userController.deleteUserById
);

module.exports = router;
