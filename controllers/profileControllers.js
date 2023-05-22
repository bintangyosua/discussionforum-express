const { runQuery } = require("../config/database");

exports.getProfile = async (req, res) => {
  try {
    res.status(200).json(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getQuestionsByUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const sql =
      "SELECT u.id_user, u.fullname, u.role, q.question_id, q.question_content, q.question_created, q.total_answers, c.category_name FROM user u INNER JOIN question q ON u.id_user = q.id_user INNER JOIN category c ON q.category_id = c.category_id WHERE u.id_user = ?";
    const values = [id_user];
    const results = await runQuery(sql, values);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getThreadsByUser = async (req, res) => {
  const { id_user } = req.params;

  try {
    const sql =
      "SELECT u.id_user, u.fullname, u.role, q.question_id, q.question_content, t.thread_id, t.thread_content FROM user u INNER JOIN question q ON u.id_user = q.id_user INNER JOIN thread t ON q.question_id = t.question_id WHERE u.id_user = ?";
    const values = [id_user];

    const result = await runQuery(sql, values);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
