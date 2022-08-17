import express from "express";
const app = express();

// 주식가격 조회하기
app.get("/stocks", function (req, res) {
  res.send("주식가격을 조회합니다.");
});

// 주식최대가격 조회하기
app.get("/stocks/max", function (req, res) {
  res.send("주식의 최대가격 정보를 조회합니다.");
});

// 신규주식 등록하기
app.post("/stocks", function (req, res) {
  res.send("신규주식을 등록합니다.");
});

app.listen(3002);
