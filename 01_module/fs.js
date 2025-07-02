//File System

const fs = require("fs");

console.log("start");
// readFile
// 1. 비동기
// fs.readFile("./sample/output.log", "utf-8", (err, data) => {
//   // fs.readFileSync()  //현재폴더기준/ 샘플폴더/아웃풋.로그
//   if (err) {
//     throw err;
//   } else console.log(data);
// });
// 비동기 처리라서  start , end , callback함수가 실행

// 2. 동기
// let data = fs.readFileSync("./sample/output.log", "utf-8");
// console.log(data);
// 동기 방식처리라서 start callback end 순. 대신 작업이 많아지면 느려짐

// writeFile
fs.writeFile("./sample/write.txt", "글쓰기..", "utf-8", (err) => {
  if (err) {
    throw err;
  }
  console.log("쓰기완료");
});
console.log("end");
