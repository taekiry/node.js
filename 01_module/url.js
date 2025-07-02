const url = new URL(
  "https://user:pass@sum.example.com:8080/a/b/c/?query=name&num=1#node"
);

const params = url.searchParams;

console.log(url);
console.log(params.get("query")); // params에 query와 num 속성 존재. query에 대한 결과값 name 반환
console.log(params.get("num"));
