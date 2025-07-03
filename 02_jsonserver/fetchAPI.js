// fetchAPI.js

async function json_func() {
  try {
    let promise = await fetch("http://localhost:3000/posts/1", {
      method: "put",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ id: 12, title: "fetch연습1", author: "admin" }),
    });

    let resolve = await promise.json();
    console.log("수정된 결과 =>", resolve);

    promise = await fetch("http://localhost:3000/posts");
    resolve = await promise.json();
    console.log("조회된 결과=>", resolve);
  } catch (err) {
    console.log(err);
  }
}
json_func();
