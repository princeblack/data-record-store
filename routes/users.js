const express = require('express');
const router = express.Router();
const {validationRules,userValidationErrorHandling} = require('../validators/validator')
const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser
} = require('../controllers/usersController');

router
  .route('/')
  .get(getUsers)
  .post(validationRules(),userValidationErrorHandling,addUser);

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;