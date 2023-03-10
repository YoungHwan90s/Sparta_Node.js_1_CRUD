const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comment");
const Posts = require("../schemas/post");

// 댓글 목록 조회 API
router.get("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;

    // postsId에 해당하는 post를 가지고 오기
    const posts = await Posts.find({ postsId });
    const savedPost = posts.map((post) => {
        return {
            "Post_No.": post.postsId,
            "제목": post.title,
            "이름": post.name,
            "내용": post.content,
            "작성일": post.createdAt
        };
    });
    // postsId에 해당하는 comments 가지고 오기
    const comments = await Comments.find({ postsId }).sort({ createdAt: -1 });
    const savedComment = comments.map((comment) => {
        return {
            "Comment_No.": comment.commentsId,
            "이름": comment.name,
            "댓글 내용": comment.comment,
            "작성일": comment.createdAt
        };
    });
    res.json({ "게시글": savedPost, "댓글 목록": savedComment });

});

// 댓글 작성 API
router.post("/posts/:postsId/comments/:commentsId", async (req, res) => {
    const { postsId, commentsId } = req.params;
    const { name, comment } = req.body;

    if (comment === "") {
        return res.status(404).json({ success: false, result: "댓글 내용을 입력해주세요" });
    } else {
        await Comments.create({ postsId, commentsId, name, comment });
        res.json({ result: "작성완료" });
    }
})

// 댓글 수정 API
router.put("/posts/:postsId/comments/:commentsId", async (req, res) => {
    const { comment } = req.body;
    const { commentsId } = req.params;
    const createdAt = new Date()

    const existsComments = await Comments.find({ commentsId });
    if (existsComments.length) {
        await Comments.updateOne({ commentsId }, { $set: { comment, createdAt } });
    } else {
        return res.status(404).json({ success: false, result: "댓글이 유효하지 않습니다" });
    }

    res.json({ success: true, result: "수정 완료" });
})
// 댓글 삭제 API
router.delete("/posts/:postsId/comments/:commentsId", async (req, res) => {
    const { commentsId } = req.params;
    const existsComments = await Comments.find({ commentsId });
    if (existsComments.length) {
        await Comments.deleteOne({ commentsId });
    } else {
        return res.status(404).json({ success: false, result: "잘못된 요청입니다" });
    }

    res.status(200).json({ success: true, result: "삭제 완료" });
});

module.exports = router;