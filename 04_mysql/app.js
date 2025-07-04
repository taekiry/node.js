const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("./nodemailer");
const multer = require("multer"); //파일 첨부
const xlsx = require("xlsx"); // 엑셀 파일분리
//const { sendEmail } = require("./nodemailer");
//dotenv 환경변수 읽어오기
require("dotenv").config({ path: "./sql/.env" });
const mysql = require("./sql"); //  /index.js 는 너무 흔하게 쓰여서 생략가능(?) // .env값을  index 에 설정해둠. dotenv config 설정후 mysql선언해야함.
console.log(process.env.HOST);
console.log(process.env.USER);

const app = express();
app.use(bodyParser.json()); // post 방식으로 넘길때 body의 타입을 json으로 넘기려고 즉 node가 읽을땐 js타입.

app.get("/", (req, res) => {
  res.send("Root 경로");
});

// 이메일 발송 화면
app.get("/email", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); //path.join 경로 더하고 더해서 경로 만들어줌.
});

// 이메일 전송
app.post("/email", async (req, res) => {
  try {
    let result = await nodemailer.sendEmail(req.body.param);
    console.log(result);
    res.json({ retCode: "success", retVal: result }); //{"retCode":"success"}
  } catch (err) {
    res.json({ retcode: "fail" });
  }
});
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

// 엑셀 업로드 -> DB insert
// multer.
const upload = multer({
  storage: storage, // multer안에 storage 속성에 위의 storage 저장.
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.get("/excel", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "excel.html")); //path.join 경로 더하고 더해서 경로 만들어줌.
});

// 첨부 파일
app.post("/excel", upload.single("myFile"), (req, res) => {
  //업로드할 파일이 한개면 싱글, html input tag에  Name속성값
  console.log(req.files); //업로드 파일 정보
  console.log(req.body); // 요청 몸체의 정보

  const workbook = xlsx.readFile(`./uploads/${req.file.filename}`);
  const firstSheetName = workbook.SheetNames[0];

  if (!req.file) {
    res.send("이미지 파일처리");
  }
  res.send("업로드 완료");
});

// 조회.
app.get("/customers", async (req, res) => {
  // get방식은 header에만 정보가 넘어감 따라서 bodyparser 안먹힘.
  try {
    let result = await mysql.query("customerList");
    res.send(result);
  } catch (err) {
    res.send("에러발생 =>", err);
  }
});

// 추가
app.post("/customers", async (req, res) => {
  try {
    let data = req.body.param;
    let result = await mysql.query("customerInsert", data);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

// 수정
app.put("/customers", async (req, res) => {
  try {
    let data = req.body.param;
    let result = await mysql.query("customerUpdate", data);
    res.send(result);
  } catch (err) {
    res.send("에러발생 =>", err);
  }
});

//삭제 ( http://localhost:3000/customer/?id=8&name=Hong) 경로에다가 id값 몇번 적어줘서 삭제하는 방법
//(http://localhost:3000/customer/8/Hong)
app.delete("/customers/:id/:name", async (req, res) => {
  //:id로 파라미터 지정.
  try {
    console.log(req.params); // req에 있는 params라는 속성.Express에서 URL 경로의 변수(파라미터) 를 받을 때 사용하는 객체입니다.출력 : {id:'9'}
    let { id, name } = req.params; //url에서 받은 id값 추출
    console.log(id, name);
    let result = await mysql.query("customerDelete", id); //db에 전달
    res.send(result); //클라이언트에게 결과 응답
  } catch (err) {
    res.send("에러발생 =>", err);
  }
});

app.listen(3000, () => {
  console.log("http://localhost:3000 running....!");
});

// pool.query("select * from customers", (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   }
//   console.log(result);
// });

// let data = ["name01", "test@eamil.com", "010-1111-1111"];

// data = [
//   {
//     name: "username3",
//     email: "user@email.com",
//     phone: "010-2332-2222",
//     address: "",
//   },
//   8,
// ];
// pool.query("update customers set ? where id = ?", data, (err, result) => {
//   //data에 객체타입으로 column 값 넘겨줄 수 있음.
//   if (err) {
//     console.log("처리중 에러", err);
//   }
//   console.log(result);
// });

// pool.query("delete from `customers where id ?", [4], (err, result) => { id가 5인 (5번째) 값을 삭제
//   //data에 객체타입으로 column 값 넘겨줄 수 있음.
//   if (err) {
//     console.log("처리중 에러", err);
//   }
//   console.log(result);
// });

// 이제 웹과 연결 express로

// query("customerInsert", [
//   // {
//   //   name: "홍길동",
//   //   email: "hong@giae.com",
//   //   phone: "010-1231-4545",
//   //   address: "",
//   // },
// ]);
