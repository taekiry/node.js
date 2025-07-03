const mysql = require("mysql2");
// const mysql2 = require("mysql2"); 하나만 해야됨. mysql or mysql2
const custSql = require("./sql/customerSql");

const pool = mysql.createPool({
  //db와 연결하는 pool 생성
  host: "127.0.0.1",
  port: 3306,
  user: "dev01",
  password: "dev01",
  database: "dev",
  connectionLimit: 10,
});

// pool.query("select * from customers", (err, result) => {
//   if (err) {
//     console.log("처리중 에러", err);
//   }
//   console.log(result);
// });

let data = ["name01", "test@eamil.com", "010-1111-1111"];

data = [
  {
    name: "username3",
    email: "user@email.com",
    phone: "010-2332-2222",
    address: "",
  },
  8,
];
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

function query(alias, values) {
  pool.query(custSql[alias], values, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
  });
}

query("customerInsert", {
  name: "홍길동",
  email: "hong@giae.com",
  phone: "010-1231-4545",
  address: "",
});
