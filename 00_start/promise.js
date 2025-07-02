// promise.js

const promise = new Promise(function (resolve, reject) {
  //promise 객체의 매개값 function ,function의 매개값 1.잘 실행됫을때, 2. 에러났을때
  //resolve("ok"); //  잘 실행되면 첫번째 함수(.then) 에 ok를 전달 하겠습니다.
  //reject("err"); //  실패 했을때 두번째 함수인 catch의 함수로 전달.
  let run = parseInt(Math.random() * 2);
  // falsy => 0, null, "", undefined 이외에는 truthy.
  if (run) {
    setTimeout(function () {
      resolve({ id: "user", name: "회원" });
    }, 1000);
  } else {
    reject(new Error("에러호출"));
  }
});

promise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });

//ajax call
fetch(
  "https://charleslee-6617723.postman.co/workspace/3461b914-2d4f-41c9-8c64-f24308da11f5/request/45560951-edf6f244-dc04-42e6-a962-02a67c0332d1?action=share&source=copy-link&creator=45560951&ctx=documentation"
)
  .then((json) => json.json())
  .then((result) => {
    console.log(result);
  })
  .catch((err) => console.error(err));
