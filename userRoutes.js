//Importing the express module in full
import express from 'express';
//import UserController object
import { UserController } from 'UserController.js';

const router = express.Router();

//http://www.excellentstock.com/api/va/users

const endpoint = '/api/v1/user';

//Creating the new user at the database
router.post(endpoint, (req, res) => {
    UserController.createUser(req.body);
    res.status(201).json({ message: 'POST users' });
})

//Read operation - GET All Users
router.get(endpoint, (req, res) => {
    const users = userController.getAllUsers();
    res.status(200).json(users);
});

//Read operation - GET User by ID
router.get(`${endpoint}/:id`, (req, res) => {
    userController.getUserById(req.params.id * 1);
    res.status(200).json({ message: `GET by ID: ${req.params.id}` });
});

//Update user at the database
router.put(`${endpoint}/:id`, (req, res) => {
    userController.updateUserById(req.body, req.params.id * 1);
    res.status(200).json({ message: `PUT by Id: ${req.params.id}` });
});

//Delete user by ID
router.delete(`${endpoint}/:id`, (req, res) => {
    userController.deleteUserById(req.params.id * 1);
    res.status(204).json({ message: `DELETE by Id: ${req.params.id}` });
});