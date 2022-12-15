const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comment");
const Posts = require("../schemas/post");

// 댓글 목록 조회 API
router.get("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;

    // postsId에 해당하는 posts를 가지고 오기
    const posts = await Posts.find({ postsId: postsId });
    // postsId에 해당하는 comments 가지고 오기
    const comments = await Comments.find({ postsId: postsId });

    const results = comments.map((comment) => {
        return {
            "posts": posts.find((item) => item.postsId === comment.postsId),
            "name": comment.name,
            "comment": comment.comment,
            "createdAt": comment.createdAt
        };
    });
    res.json({ "comments": results });

});

// 댓글 작성 API
router.post("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;
    const { name, comment } = req.body;
    const createdAt = new Date()


    await Comments.create({ postsId, name, comment, createdAt });
    res.json({ result: "작성완료" });
})

// 댓글 수정 API
router.put("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;
    const { comment } = req.body;
    const createdAt = new Date()

    const existsComments = await Comments.find({ postsId });
    if (existsComments.length) {
        await Comments.updateOne({ postsId: Number( postsId ) }, { $set: { comment, createdAt } });
    } else {
        return res.status(404).json({ success: false, result: "댓글 내용을 입력해주세요" });
    }

    res.json({ success: true, result: "수정 완료" });
})
// 댓글 삭제 API
router.delete("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;
    const existsComments = await Comments.find({ postsId });
    if (existsComments.length) {
        await Comments.deleteOne({ postsId });
    }

    res.status(200).json({ success: true, result: "삭제 완료" });
});

module.exports = router;