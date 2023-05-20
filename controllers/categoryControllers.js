const { runQuery } = require("../config/database");

module.exports.getAllCategories = async (req, res) => {
  try {
    const sql = "SELECT * FROM category";

    const result = await runQuery(sql);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
