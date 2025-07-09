const express = require("express");
const bodyParser  = require("body-parser")
const friendRouter = require("./routes/friend.js")
const app = express();
const port = 3000;
const cors = require("cors");
const multer = require("multer");

app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.json());
app.use(cors());

const ob = {
  id : "xozlfl",
  email : "xozlfl789@naver.com"
}
// app.get('/review', (req, res) => {
//   res.send(ob);
// });

// app.post("/review", (req, res) => {
//   console.log(req.body);
//   res.send("json요청")
// })

app.use("/friend", friendRouter);

app.get("/getCors", (req, res) => {
  let result = {id :1 , name:"hong"}
  res.send(result);
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    let fn = Buffer.from(file.originalname, "latin1").toString("utf-8")
    cb(null, Date.now() + "_" + fn)
  }
})

const upload = multer({
  storage : storage,
  limits: { fileSize: 5 * 1024 * 1024},
  fileFilter: function (req, file, cb) {
    const mimetype = /jpg | jpeg |png | gif/.test(file.mimetype)
  }
})

app.listen(port, () =>{
  console.log("서버시작")
});