const express = require('express');
const router = express.Router();
const Comments = require("../schemas/comment");
const Posts = require("../schemas/post");

// 댓글 목록 조회 API
router.get("/posts/:postsId/comments", async (req, res) => {
    const { postsId } = req.params;
    
    // postsId에 해당하는 post를 가지고 오기
    const posts = await Posts.find({ postsId: postsId });
    const savedPost = posts.map((post) => {
        return {
            "title": post.title,
            "name": post.name,
            "content": post.content,
            "createdAt": post.createdAt
        };
    });
    // postsId에 해당하는 comments 가지고 오기
    const comments = await Comments.find({ postsId: postsId }).sort({createdAt : -1});
    const savedComment = comments.map((comment) => {
        return {
            "No.": comment.commentsId,
            "name": comment.name,
            "comment": comment.comment,
            "createdAt": comment.createdAt
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

        await Comments.create({ postsId, commentsId, name, comment});
        res.json({ result: "작성완료" });
    }
})

// 댓글 수정 API
router.put("/posts/:postsId/comments", async (req, res) => {
    const { comment, commentsId } = req.body;
    const createdAt = new Date()

    const existsComments = await Comments.find({ commentsId });
    if (existsComments.length) {
        await Comments.updateOne({ postsId: Number(commentsId) }, { $set: { comment, createdAt } });
    } else {
        return res.status(404).json({ success: false, result: "댓글 내용을 입력해주세요" });
    }

    res.json({ success: true, result: "수정 완료" });
})
// 댓글 삭제 API
router.delete("/posts/:postsId/comments", async (req, res) => {
    const { commentsId } = req.body;
    const existsComments = await Comments.find({ commentsId });
    if (existsComments.length) {
        await Comments.deleteOne({ commentsId });
    }

    res.status(200).json({ success: true, result: "삭제 완료" });
});

module.exports = router;