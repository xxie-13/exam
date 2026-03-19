//SQL
const connection = require("../config/db");

exports.getAllItem = (req, res) => {
  connection.query("SELECT * FROM eu_store", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
};

//search an item by id
exports.getItemById = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM eu_store WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    },
  );
};

// search an item by name
exports.getItemByName = (req, res) => {
  const item = req.params.item;
  connection.query(
    "SELECT * FROM eu_store WHERE item=?",
    [item],
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    },
  );
};

exports.createItem = (req, res) => {
  const { id, item, quantity, price } = req.body;
  connection.query(
    "INSERT INTO eu_store (id, item, quantity, price) VALUES (?, ?, ?, ?)",
    [id, item, quantity, price],
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "Item created successfully",
        itemId: result.insertId,
      });
    },
  );
};

//update an item
exports.updateItem = (req, res) => {
  const { id, item, quantity, price } = req.body;
  connection.query(
    "UPDATE eu_store SET item=?, quantity=?, price=? WHERE id=?",
    [item, quantity, price, id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: "Item updated successfully" });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    },
  );
};

//delete an item
exports.deleteItem = (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM eu_store WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });
};
