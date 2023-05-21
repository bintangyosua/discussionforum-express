const { runQuery } = require("../config/database");
const { buildReplyTree, convertReplyToJson } = require("../utils/replyToJson");

exports.addReply = async (req, res) => {
  const { reply_id, reply_content, id_user, thread_id, parent_reply_id } =
    req.body;

  try {
    const sql =
      "INSERT INTO reply (reply_id, reply_content, id_user, thread_id, parent_reply_id) VALUES (?, ?, ?, ?, ?)";
    const values = [
      reply_id,
      reply_content,
      id_user,
      thread_id,
      parent_reply_id,
    ];

    const response = await runQuery(sql, values);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllReplies = async (req, res) => {
  try {
    const sql = `SELECT * FROM reply`;

    const data = await runQuery(sql);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllRepliesByThreadId = async (req, res) => {
  const thread_id = req.params;

  try {
    const sql = "SELECT * FROM reply WHERE thread_id = ?";
    const values = [thread_id];

    const response = await runQuery(sql, values);

    const replyTree = buildReplyTree(response);
    const replyJson = replyTree.map((reply) => convertReplyToJson(reply));

    res.status(200).json(replyJson);
  } catch (error) {
    console.error(error);
  }
};

exports.updateReply = async (req, res) => {
  const { reply_id, reply_content } = req.body;

  try {
    const sql = "UPDATE reply SET reply_content = ? WHERE reply_id = ?";
    const values = [[reply_content, reply_id]];

    const response = await runQuery(sql, values);

    res.status(200).json({ message: "Reply Updated", response });
  } catch (error) {
    console.error();
  }
};

exports.deleteReply = async (req, res) => {
  const reply_id = req.params.id;
  try {
    const sql = "DELETE FROM reply WHERE reply_id = ?";
    const values = [reply_id];

    await runQuery(sql, values);

    res.status(200).json({ message: "reply has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
