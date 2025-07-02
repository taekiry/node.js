const path = require("path");

console.log(__filename);
console.log(path.basename(__filename));
console.log(path.basename(__filename, ".js"));

let result = path.format({
  //format 각 속성 조합 -> 경로 생성

  base: "sample.txt",
  dir: "/home/temp",
});

console.log(result);

result = path.parse("/home/temp/sample.txt"); // parse 각 속성 분해
console.log(result);
