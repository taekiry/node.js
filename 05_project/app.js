const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const multer = require("multer");
const fs = require("fs");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");
const { error } = require("console");

const app = express();

//body-parser express모듈에 있는 json()으로 .
app.use(express.json());

app.listen(3000, () => {
  console.log("http://localhost:3000  서버 시작");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

// 데이터 쿼리.
app.post("/api/:alias", async (req, res) => {
  // ex) localhost:3000/api/productList 라우팅 정보를 통해서 실행할 쿼리 지정.

  // console.log(req.params.alias);
  // console.log(req.body.param);  //{"param": {pn:'',pp:23,...} }으로 포스트맨에서
  // console.log(req.body.where);

  const result = await query(req.params.alias, req.body.param, req.body.where); //  포스트맨에서 req.body에 where 정의해둠.
  res.send(result);
});

// 파일 다운로드.
app.get("/download/:productId/:fileName", (req, res) => {
  const { productId, fileName } = req.params;
  const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
  // 응답정보.
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}` //lastIndexof(".") .을 기준으로 뒤에 것 전부 가져옴.
  );
  if (!fs.existsSync(filepath)) {
    //existsSync 함수 경로에 실제 파일이 있는지 여부체크.
    console.log("파일이 없습니다."); //근데 빈 파일도 다운이 되는상황임.
    return res.status(404).json({ error: "can not found file." });
  } else {
    fs.createReadStream(filepath).pipe(res); // pipe(파이프) => 최종 목적지에 앞의 경로를따라가서 응답정보를 복사.
    res.send("다운로드 완료");
  }
});

// 파일 업로드.

app.get("/upload/:productId/:fileName", (req, res) => {});
