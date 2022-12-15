const express = require('express');
const router = express.Router();

const posts = [
    {
        postsId: 1,
        title: "어려워",
        name: "영환",
        date: new Date(),
    },
    {
        postsId: 2,
        title: "이게 쉬워?",
        name: "정기",
        date: new Date(),
    },
    {
        postsId: 3,
        title: "난 너무 쉬운데? ㅎ",
        name: "진영",
        date: new Date(),
    },
    {
        postsId: 4,
        title: "저는 뭐...",
        name: "경진",
        date: new Date(),
    },
  ];

  // 전체 게시글 조회 API
  router.get("/posts", (req,res) => {
    res.status(200).json({posts})
  });

  module.exports = router;