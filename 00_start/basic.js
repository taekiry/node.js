const { members, add, getPerson } = require("./data.js");

console.log("hello, world");

let myName = "홍길동";
let age = 20;

if (age >= 20) {
  console.log(`${myName}성인`);
} else {
  console.log(`${myName}미성인`);
}

//console.log(members);
//console.log(add(10, 20));

members.forEach((item, idx) => {
  if (idx > 0) {
    console.log(item);
  }
}); //function(item, idx, array)

let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr4 = [arr1, arr2];
let arr3 = [...arr1, ...arr2, ...arr2]; //배열요소 풀어서 한 배열로 만들어줌.

console.log(arr4);
console.log(arr3);

//Object Destructuring
let { firstName, lastName, email } = getPerson(); //getPerson의 firstName속성을 firstName 객체에 담겟다.

console.log(firstName, lastName, email);

//Array Destructuring
function getScores() {
  return [70, 80, 90, 50, 60, 40];
}

let [x, y, ...z] = getScores();
console.log(`x=${x}, y=${y}, z=${z}`); // ...을 붙였기 때문에 나머지 값을 다 가져옴.

function sumAry(...ary) {
  //...ary => 파라미터의 갯수를 알 수 없을때.
  let sum = 0;
  for (let num of ary) {
    sum += num;
  }
  return console.log(` 합계:${sum}`);
}

sumAry(z); //합계: 090,50,60,40  왜그럴까? 이걸 sumAry(z)로 넘기면 매개변수 ...ary는 이걸 한 덩어리 배열로 받아버려 => 0[90, 50, 60, 40]이 되버림.
sumAry(...z);
