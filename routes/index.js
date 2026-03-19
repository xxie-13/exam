const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//Route to get all users
router.get("/users", userController.getAllUsers);

//Route to search a user by id
router.get("/users/:id", userController.getUserById);
//router.get('/users/:,ip_address',userController.getUserByIp);
router.post("/users", userController.createUser);
router.put("/users", userController.updateUser);
router.delete("/users", userController.deleteUser);

module.exports = router;
