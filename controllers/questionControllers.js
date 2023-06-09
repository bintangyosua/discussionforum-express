const insertQuery =
  "INSERT INTO question (question_id, question_content, category_id, id_user) VALUES (?, ?, ?, ?)";
const updateQuery =
  "UPDATE question SET question_content = ?, category_id = ? WHERE question_id = ?";

//? VALUELS

const { runQuery } = require("../config/database");

module.exports.addQuestion = async (req, res) => {
  const { question_id, question_content, category_id, id_user } = req.body;

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const thread_created = `${year}-${month}-${day}`;

  try {
    const values = [
      question_id,
      question_content,
      category_id,
      id_user,
      thread_created,
    ];
    const response = await runQuery(insertQuery, values);

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getAllQuestions = async (req, res) => {
  try {
    const sql = "SELECT * FROM question";
    const result = await runQuery(sql);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getQuestionById = async (req, res) => {
  const question_id = req.params.question_id;

  try {
    const sql = `SELECT question.*, category.category_name FROM question
    INNER JOIN category
    ON question.category_id = category.category_id
    WHERE question_id = ?`;
    const values = [question_id];

    const result = await runQuery(sql, values);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateQuestion = async (req, res) => {
  const { question_id, question_content, category_id, id_user } = req.body;
  const qp_id = req.params.question_id;

  try {
    const values = [question_content, category_id, id_user, qp_id];
    const response = await runQuery(updateQuery, values);
    res.status(200).json({ message: "Question Updated", response: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteQuestionById = async (req, res) => {
  const question_id = req.params.question_id;

  try {
    const sql = "DELETE FROM question WHERE question_id = ?";
    const values = [question_id];

    await runQuery(sql, values);

    res.status(200).json({ message: "Question has been deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).jsin({ message: "Internal Server Error" });
  }
};

module.exports.getQuestionAnswerCount = async (req, res) => {
  const question_id = req.params.question_id;

  try {
    const sql = "SELECT get_total_answer_count(?)";
    const values = [question_id];

    const result = await runQuery(sql, values);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
