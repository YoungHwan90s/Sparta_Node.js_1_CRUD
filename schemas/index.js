const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://test:sparta@cluster0.8d7bfaw.mongodb.net/?retryWrites=true&w=majority")
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;
