const express = require('express')

const router = express.Router();

router.get("/me", async (req, res) => {
    const admin = await Doctor.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({ msg: "Admin doesn't exist" });
      return;
    }
    res.json({
        username: admin.username
    });
});

module.exports = router;