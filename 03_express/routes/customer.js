const express = require("express");
const router = express.Router(); //router 인스턴스 생성

// 라우팅 정보
router.get("/customers", (req, res) => {
  res.send("/customer 루트 디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/customer POST 요청");
});

router.put("/update", (req, res) => {
  res.send("/customer PUT 요청");
});

router.delete("/delete", (req, res) => {
  res.send("/customer DELETE 요청");
});

//export
module.exports = router;
