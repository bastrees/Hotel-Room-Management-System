const express = require('express');
const router = express.Router();

const UserController = require('../controller/User.controller');

router.post('/loginuser', UserController.LoginUser);
router.post('/logout', UserController.LogoutUser);
router.post('/createuser', UserController.CreateUser);
router.get('/users', UserController.ListUsers);
router.put('/users/:id', UserController.EditUser);
router.delete('/users/:id', UserController.DeleteUser);
router.get('/users/managers', UserController.ListManagers);
router.get('/users/customers', UserController.ListCustomers);
router.get('/users/pending', UserController.ListPendingUsers);
router.put('/users/approve/:id', UserController.ApproveUser);

module.exports = router;
