//SQL
const connection = require("../config/db");
//get all users
exports.getAllUsers = (req, res) => {
  connection.query("SELECT * FROM userdata", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
};

//search a user by id
exports.getUserById = (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM userdata WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    },
  );
};

// search a user by last name
exports.getUserByLastName = (req, res) => {
  const last_name = req.params.last_name;
  connection.query(
    "SELECT * FROM userdata WHERE last_name=?",
    [last_name],
    (err, rows, fields) => {
      if (err) throw err;
      res.json(rows);
    },
  );
};

exports.createUser = (req, res) => {
  const { first_name, last_name, email, gender, course } = req.body;
  connection.query(
    "INSERT INTO userdata (first_name, last_name, email, gender, course) VALUES (?, ?, ?, ?, ?)",
    [first_name, last_name, email, gender, course],
    (err, result) => {
      if (err) throw err;
      res.json({
        message: "User created successfully",
        userId: result.insertId,
      });
    },
  );
};

//update a user
exports.updateUser = (req, res) => {
  const { id, first_name, last_name, email, gender, course } = req.body;
  connection.query(
    "UPDATE userdata SET first_name=?, last_name=?, email=?, gender=?, course=? WHERE id=?",
    [first_name, last_name, email, gender, course, id],
    (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.json({ message: "User updated successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    },
  );
};

//delete a user
exports.deleteUser = (req, res) => {
  const id = req.body.id;
  connection.query("DELETE FROM userdata WHERE id=?", [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
};
