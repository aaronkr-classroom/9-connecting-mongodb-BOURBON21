// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
  subscribe = require("./models/subscriber");
const subscriber = require("./models/subscriber");
// 데이터베이스 연결 설정
mongoose.connect(
  "mongodb+srv://ut-node:1h09KRiarilGkhKm@ut-node.br8wxbu.mongodb.net/?retryWrites=true&w=majority&appName=UT-Node",
  { useNewUrlParser : true}
);

mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "Aaron",
    email: "Aaron@aaron.kr",
    phoneNumber: "01055466541",
  },
  {
    name: "Trump",
    email: "donall@trump.com",
    phoneNumber: "1111111",
  },
  {
    name: "biden",
    email: "whoami@uas.com",
    phoneNumber: "0000000",
  },
  {
    name: "Yoon",
    email: "yoon@suck-yul.com",
    phoneNumber: "999999999",
  },
  {
    name: "kim",
    email: "kim@jongeun.com",
    phoneNumber: "666",
  },
  {
    name: "JongKook",
    email: "gymjk@youtube.com",
    phoneNumber: "2222222",
  },
];

// 기존 데이터 제거
subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscribers deleted!")
  });

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
  commands.push(
    subscriber.create({
      name: s.name,
      email: s.email,
      phoneNumber: s.phoneNumber
    })
  );
});




// 프라미스 생성 후 로깅 작업
Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(e => {
    console.log(`Error:${e}`);
  });
