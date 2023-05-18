const { runQuery } = require("../config/database");

exports.addReply = async (req, res) => {
  const { reply_id, reply_content, id_user, thread_id, action } = req.body;

  try {
    const sql = "INSERT INTO reply VALUES (?, ?, ?, ?)";
    const values = [reply_id, reply_content, id_user, thread_id];

    await runQuery(sql, values);

    res.status(200).json({ message: "Reply added." });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
};

exports.getAllReplies = async (req, res) => {
  const { thread_id } = req.body;

  try {
    const sql = `SELECT reply.* FROM reply
      INNER JOIN thread
      ON reply.thread_id = thread.thread_id
      WHERE reply.thread_id = ?
      `;
    const values = [thread_id];

    const data = await runQuery(sql, values);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
