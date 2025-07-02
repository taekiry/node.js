//01_module/console.js
//내장 객체 console, fs
// 내장 모듈 fs : fileSystem

const fs = require("fs");
const { Console } = require("console");
const express = require("express"); //npm install로 설치한 외부모듈

//sample 폴더 하위에 ouptut.log, errlog 파일 생성
const output = fs.createWriteStream("./sample/output.log", { flags: "a" }); // flags : "a" (append)호출될때마다 값이 누적됨.
const errlog = fs.createWriteStream("./sample/errlog.log", { flags: "a" });

const logger = new Console({
  //console 내장객체에 있는 속성들  stdout, strderr
  stdout: output, //standard output
  stderr: errlog, //
});

logger.log("로그기록하기");
logger.error("에러로그");
console.log("end");

//npm(node package manager) install express => node_modules 설치됨. npm은 cmd열어서 작업.
