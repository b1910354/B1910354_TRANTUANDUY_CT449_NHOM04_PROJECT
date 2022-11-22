const express = require("express");
const scheduleWorks = require("../controllers/schedule-work.controller");
const router = express.Router();

router.route("/")
    .get(scheduleWorks.findAll)
    .post(scheduleWorks.create)

router.route("/:id")
    .get(scheduleWorks.find)

module.exports = router;