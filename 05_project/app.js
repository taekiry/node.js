const express = require("express");
require("dotenv").config({ path: "./mysql/.env" });
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { query } = require("./mysql/index.js");
const bodyParser = require("body-parser");
const { error } = require("console");

//서버 인스턴스 생성.
const app = express();

//cors 처리
app.use(cors());

//body-parser express모듈에 있는 json()으로 .
app.use(express.json({ limit: "10mb" }));

//서버 실행
app.listen(3000, () => {
  console.log("http://localhost:3000 서버 시작");
});

app.get("/", (req, res) => {
  res.send("Root Router");
});

//html 여는 경로.
app.get("/fileupload", (req, res) => {
  //html파일 열어야되니까
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
app.get("/download/:pid/:fileName", (req, res) => {
  const { pid, fileName } = req.params;
  console.log(req.params);
  const filepath = `${__dirname}/uploads/${pid}/${fileName}`;
  // 응답정보.
  res.header(
    "Content-Type",
    `image/${fileName.substring(fileName.lastIndexOf("."))}` //substring(lastIndexof(".")) .을 기준으로 뒤에 것 전부 가져옴.
  );
  if (!fs.existsSync(filepath)) {
    //existsSync 함수 경로에 실제 파일이 있는지 여부체크.
    console.log("파일이 없습니다."); //근데 빈 파일도 다운이 되는상황임.
    return res.status(404).json({ error: "can not found file." });
  } else {
    fs.createReadStream(filepath).pipe(res); // pipe(파이프) => 최종 목적지에 앞의 경로를따라가서 응답정보를 복사.
  }
});

// 업로드폴더 경로 없을경우 생성.
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  // D://dev/git/node../05_project/uploads 가 있는가?
  fs.mkdirSync(uploadDir);
}

// 파일 업로드. 포스트맨으로 처리 힘들어서 업로드 페이지하나 만들고 작성.
app.post("/upload/:fileName/:pid/:type", (req, res) => {
  const { fileName, pid, type } = req.params; //{filename :"sample.jpg", 더있다면 productId : 3 }
  // const filepath = `${__dirname}/uploads/${productId}/${fileName}`;

  //업로드 폴더 안에 상품id가 적힌 폴더를 없으면 생성하도록.
  let productDir = path.join(uploadDir, pid);
  if (!fs.existsSync(productDir)) {
    // D://dev/git/node../05_project/uploads/productId 가 있는가?
    fs.mkdirSync(productDir);
  }
  //챗지피티 경로 공격 defense
  const safeFilename = path.basename(fileName);
  const filepath = path.join(productDir, safeFilename);

  let base64Data = req.body.data;
  let data = base64Data.slice(base64Data.indexOf(";base64,") + 8); //axios가 넘겨준 data라는 속성을 받아옴. 근데 data형식에 base64, 뒤부터가 이름
  fs.writeFile(filepath, data, "base64", async (err) => {
    // pid, type, filename => db insert
    await query("productImageInsert", [
      { product_id: pid, type: type, path: fileName },
    ]);
    if (err) {
      return res.status(500).send("error");
    }
    res.status(200).send("success");
  });
});

// todo목록.
app.get("/todoList", async (req, res) => {
  const result = await query("todoList");
  console.log(result);
  res.json(result);
});

// todo삭제.
app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("todoDelete", id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});
