//const { Router } = require("express"); //express 에서 Router 객체만 가져올 수 있음
const express = require("express");
const router = express.Router(); //router 인스턴스 생성

// 라우팅 정보
router.get("/products", (req, res) => {
  res.send("/product 루트 디렉토리");
});

router.post("/insert", (req, res) => {
  res.send("/product POST 요청");
});

router.put("/update", (req, res) => {
  res.send("/product PUT 요청");
});

router.delete("/delete", (req, res) => {
  res.send("/product DELETE 요청");
});

//export
module.exports = router;
