const express = require("express");
const router = express.Router();

router.get("/friend", (req ,res) => {
  res.send("get 방식")
});
router.post("/friend", (req ,res) => {
  res.send("post 방식")
});
router.put("/friend", (req ,res) => {
  res.send("put 방식")
});
router.delete("/friend", (req ,res) => {
  res.send("delete 방식")
});

module.exports = router;