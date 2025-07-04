const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("./sql"); //  /index.js 는 너무 흔하게 쓰여서 생략가능(?)

//dotenv 환경변수 읽어오기
require("dotenv").config({ path: "./sql/.env" });
console.log(process.env.HOST);
console.log(process.env.USER);

const app = express();
app.use(bodyParser.json()); // post 방식으로 넘길때 body의 타입을 json으로 넘기려고 즉 node가 읽을땐 js타입.

app.get("/", (req, res) => {
  res.send("Root 경로");
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
