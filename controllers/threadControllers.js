const { runQuery } = require("../config/database");

// Fungsi untuk menambahkan thread baru
exports.createThread = async (req, res) => {
  const { thread_id, thread_content, question_id, id_user } = req.body;

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  // Format datetime MySQL: YYYY-MM-DD HH:MM:SS
  const thread_created = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(thread_created);

  try {
    const sql = "INSERT INTO thread VALUES (?, ?, ?, ?)";
    const values = [thread_id, thread_content, question_id, id_user];

    const response = await runQuery(sql, values);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fungsi untuk mendapatkan semua thread
exports.getAllThreads = async (req, res) => {
  try {
    const sql = `SELECT t.*, q.question_content FROM thread t INNER JOIN question q ON t.question_id = q.question_id`;

    const results = await runQuery(sql);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getThreadsByQuestionId = async (req, res) => {
  const question_id = req.params.question_id;
  console.log(question_id);

  try {
    const sql = `SELECT t.*, q.question_content FROM thread t
    INNER JOIN question q
    ON t.question_id = q.question_id
    WHERE t.question_id = ?`;
    const values = [question_id];

    console.log;

    const response = await runQuery(sql, values);

    res.status(200).json(response);
    console.log(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fungsi untuk mendapatkan thread dengan id
exports.getThreadById = async (req, res) => {
  const id = req.params.id;

  try {
    const sql = "SELECT * FROM thread WHERE thread_id = ?";
    const values = [id];

    const result = await runQuery(sql, values);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fungsi untuk mengubah thread dengan id
exports.updateThreadById = async (req, res) => {
  console.log("tes");
  const id = req.params.id;
  const { thread_id, question_id, thread_content } = req.body;
  console.log(id);

  try {
    const sql =
      "UPDATE thread SET thread_content = ?, question_id = ? WHERE thread_id = ?";
    const values = [thread_content, question_id, id];

    const response = await runQuery(sql, values);

    res.status(200).json({ message: "Thread updated", response: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fungsi untuk menghapus thread
exports.deleteThreadById = async (req, res) => {
  const id = req.params.id;

  try {
    const sql = "DELETE FROM thread WHERE thread_id = ?";
    const values = [id];

    await runQuery(sql, values);

    res.status(200).json({ message: "Thread has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
