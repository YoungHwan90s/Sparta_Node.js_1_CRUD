const express = require('express');
const app = express();
const port = 3000;

// Router 미들웨어를 사용하겠다
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

const connect = require("./schemas");
connect();

// body로 전달 받은 json 데이터 사용을 위해 json middleware 사용!
app.use(express.json());
app.use("/api", [postsRouter, commentsRouter]);

// http://52.79.189.250/
app.get('/', (req, res) => {
    res.send('The page is successfully open');
  });

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});

