const crypto = require("crypto");

//let pw = crypto.createHash("sha512").update("pw1234").digest("base64");
//console.log(pw);

// salting 암호화 ( 암호값이 계속 변화함.)

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      //randombytes 매개값 1.크기 2.함수(에러,성공)
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
};
//createSalt().then((result) => console.log(result.toString("base64")));

//salt방식으로 암호화 하기.

const createCryptoPassword = (plainPassword, salt) => {
  // 평문 비밀번호와 암호화된 비밀번호.
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(plainPassword, salt, 10000, 64, "sha512", (err, key) => {
      // 평문, 솔트, 반복횟수, 결과해시 길이,해시 알고리즘(sha512방식), callback
      if (err) {
        reject(err);
      } else {
        resolve({ salt: salt, password: key.toString("base64") });
      }
    });
  });
};

//2중 암호화
async function main() {
  const salt = await createSalt();
  console.log(salt);
  const pw = await createCryptoPassword("pwer1", salt);
  console.log(pw);
}

main();
