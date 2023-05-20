const insertQuery =
  "INSERT INTO question (question_id, question_content, category_id, id_user) VALUES (?, ?, ?, ?)";
const updateQuery =
  "UPDATE question SET question_content = ?, category_id = ?, id_user = ? WHERE question_id = ?";

//? VALUELS

const { runQuery } = require("../config/database");

module.exports.addQuestion = async (req, res) => {
  const { question_id, question_content, category_id, id_user } = req.body;

  try {
    const values = [question_id, question_content, category_id, id_user];
    await runQuery(insertQuery, values);

    res.status(200).json({ message: "Question has been added." });
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
    const sql = "SELECT * FROM question WHERE question_id = ?";
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
    await runQuery(updateQuery, values);
    res.status(200).json({ message: "Question has been updated" });
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
