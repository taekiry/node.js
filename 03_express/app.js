// 서버 프로그램 app.js

// 외부 모듈 import (cmd에서 npm install 후)
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser"); //익스프레스 4.16 부터 선언 안하고 써도됨. 밑에 app.use(express) 로 가능
const multer = require("multer");

// 내장 모듈
const path = require("path");
const cors = require("cors");
//라우팅 정보 import
const customerRoute = require("./routes/customer.js");
const productRoute = require("./routes/product.js");

const app = express(); // express 서버의  instance 생성

// application/josn 요청.
app.use(bodyParser.json());

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); //중첩된 객체로 표현하게 해주는 옵션(?)

// 파일 업로드 (multer)]
// multer.diskStorage => 저장경로, 파일명 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination 이라는 메소드
    //저장경로 : (요청정보, 파일, 콜백)
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    //업로드 파일명. (동일한 이름 overwrite 안되게끔)
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8");
    cb(null, Date.now() + "_" + fn); //업로드 파일명에 현재시간 붙이면 중복x 21232114_sample.jpg
  },
});

//multer 인스턴스 생성
const upload = multer({
  storage: storage, // multer안에 storage 속성에 위의 storage 저장.
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const mimetype = /jpg | jpeg | png | gif /.test(file.mimetype); //test로 mimetype을 필터가능.
    if (mimetype) {
      return cb(null, true);
    }
    return cb(null, false);
  },
});

//  동일 출처 원칙 메소드
//app.use(cors({ origin: "http://192.168.0.19:5500/" })); //http://192.168.0.19:5500/에서 나오는 것들이 동일한 출처임을 원칙으로 설정.
app.use(cors()); //모든 서버에서 사용가능하게끔 설정.

app.get("/", (req, res) => {
  // app.메소드("경로", 일치할때 실행함수)
  //get 방식으로 "url" 호출. "/는 지정하지않아서 최상위."
  fs.readFile("./public/index.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

//express에서 에러처리하는
app.use((err, req, res, next) => {});

// 첨부 파일 업로드 화면.
app.get("/upload", (req, res) => {
  fs.readFile("./public/upload.html", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

//파일 첨부 처리.
app.post("/upload", upload.array("myFile"), (req, res) => {
  //업로드할 파일이 한개면 싱글, html input tag에  Name속성값
  console.log(req.files); //업로드 파일 정보
  console.log(req.body); // 요청 몸체의 정보
  if (!req.file) {
    res.send("이미지 파일처리");
  }
  res.send("업로드 완료");
});

//  동일 출처 원칙.
app.get("/getCors", (req, res) => {
  let result = { id: 1, name: "hongkildong" };
  res.send(result);
});
// app.get("/customer", (req, res) => {
//   res.send("/customer 경로입니다.");
//   res.json({ id: 10, name: "hongkildong" });
// });

// app.post("/customer", (req, res) => {
//   //res.send("/customer 경로의 post요청입니다."); // url에 쳐도 get방식이라 불가능 => postman 활용
//   res.json({ id: 10, name: "hongkildong" });
// });

//bodyparser 추가 공부필요

// bodyParser 를 활용해서 요청정보의 body정보를 해석.
app.post("/json-data", (req, res) => {
  console.log(req.body); //객체타입. body.안에 속성 id, name 있어서 (postman에)
  res.send("json 요청");
});

app.post("/form-data", (req, res) => {
  console.log(req.body); //객체타입. body.안에 속성 id, name 있어서 (postman에)
  res.send("form 요청");
});

// 라우팅 정보를 파일로 분리 (DB연습때 또 씀)
app.use("/customer", customerRoute); // /customer의 하위에 customerRoute 존재. postman  사용시 /customer/customers or insert or...
app.use("/product", productRoute);

app.listen(3000, () => {
  console.log("http://localhost:3000 서버실행.");
});
