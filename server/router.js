const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Serrrver is up yeeeeehaw");
});

module.exports = router;
