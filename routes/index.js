const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

//Route to get all items
router.get("/item", itemController.getAllItem);

//Route to search an item by id
router.get("/item/:id", itemController.getItemById);
router.post("/item", itemController.createItem);
router.put("/item", itemController.updateItem);
router.delete("/item", itemController.deleteItem);

module.exports = router;
