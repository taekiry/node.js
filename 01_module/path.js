const path = require("path");

console.log(__filename); // 경로 처음부터 다가져옴. d:\dev\node.js\01_module\path.js
console.log(path.basename(__filename));// path.js
console.log(path.basename(__filename, ".js")); // path

let result = path.format({
  //format 각 속성 조합 -> 경로 생성

  base: "sample.txt",
  dir: "/home/temp",
});

console.log(result);

result = path.parse("/home/temp/sample.txt"); // parse 각 속성 분해
console.log(result);
