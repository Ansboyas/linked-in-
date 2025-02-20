const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const SECRET_KEY = "your_secret_key";

// Read JSON database
const getUsers = () => JSON.parse(fs.readFileSync("database.json")).users;
const saveUsers = (users) => {
  const data = JSON.parse(fs.readFileSync("database.json"));
  data.users = users;
  fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
};

// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const users = getUsers();

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, email, password: hashedPassword };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "User registered successfully!" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

module.exports = router;
