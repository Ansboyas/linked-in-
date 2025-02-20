const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Read JSON database
const getJobs = () => JSON.parse(fs.readFileSync("database.json")).jobs;
const saveJobs = (jobs) => {
  const data = JSON.parse(fs.readFileSync("database.json"));
  data.jobs = jobs;
  fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
};

// Post a Job
router.post("/post", authMiddleware, (req, res) => {
  const { title, description, company, location } = req.body;
  const jobs = getJobs();

  const newJob = {
    id: uuidv4(),
    user_id: req.user.id,
    title,
    description,
    company,
    location,
    posted_at: new Date().toISOString(),
  };

  jobs.push(newJob);
  saveJobs(jobs);

  res.status(201).json({ message: "Job posted successfully!" });
});

// Fetch All Jobs
router.get("/jobs", (req, res) => {
  res.json(getJobs());
});

module.exports = router;
