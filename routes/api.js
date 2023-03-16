const express = require("express");
const router = express.Router();

router.use("/dash", require("./api/dash"));
module.exports = router;