const express = require('express');
const router = express.Router();
const Posts = require("../schemas/post");

// 전체 게시글 조회 API
router.get("/posts", async (req, res) => {
    const posts = await Posts.find({});
    const results = posts.map((post) => {
        return {
            "title": post.title,
            "name": post.name,
            "createdAt": post.createdAt
        };
    });

    res.status(200).json({
        "posts": results,
    });
});

// 게시글 조회 API
router.get("/posts/:postsId", async (req, res) => {
    // const {postsId} = req.params;
    // const posts = await Posts.find({});
    // const [detail] = posts.filter((posts) => Number(postsId) === posts.postsId)
    // res.status(200).json({detail});
    const { postsId } = req.params;
    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    const results = existsPosts.map((post) => {
        return {
            "title": post.title,
            "name": post.name,
            "content": post.content,
            "createdAt": post.createdAt
        };
    });

    if (existsPosts.length) {
        res.status(200).json({ results });
    } else {
        return res.status(404).json({ success: false, result: "해당 데이터를 찾을 수 없습니다." });
    }

});

// 게시글 작성 API
router.post("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;
    const createdAt = new Date()
    const { title, name, password, content } = req.body;

    const posts = await Posts.find({ postsId });
    if (posts.length) {
        return res.status(400).json({ success: false, result: "이미 있는 데이터입니다." });
    }

    await Posts.create({ postsId, title, name, password, content, createdAt });
    res.status(201).json({ success: true, result: "작성 완료" });
});


// 게시글 수정
router.put("/posts/:postsId/", async (req, res) => {
    const { postsId } = req.params;
    const { title, content } = req.body;

    const existsPosts = await Posts.find({ postsId: Number(postsId) });
    if (existsPosts.length) {
        await Posts.updateOne({ postsId: Number(postsId) }, { $set: { title, content } });
    } else {
        return res.status(404).json({ success: false, result: "해당 데이터를 찾을 수 없습니다." });
    }

    res.json({ success: true, result: "수정 완료" });
})

// 게시글 삭제
router.delete("/posts/:postsId", async (req, res) => {
    const { postsId } = req.params;
    const existsPosts = await Posts.find({ postsId });
    if (existsPosts.length) {
        await Posts.deleteOne({ postsId });
    }

    res.status(200).json({ success: true, result: "삭제 완료" });
});



module.exports = router;