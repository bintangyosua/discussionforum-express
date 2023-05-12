const { db, runQuery } = require('../config/database');


// Fungsi untuk membuat user baru
exports.createUser = async (req, res) => {
    const { id_user, password_user } = req.body;

    try {
        const sql = 'INSERT INTO user VALUES (?, ?)';
        const values = [id_user, password_user];

         await runQuery(sql, values);

        res.status(200).json({ message: 'User has been created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk mendapatkan semua data user
exports.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM user';
        const result = await runQuery(sql);

        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Fungsi untuk mendapatkan data suatu user dengan id
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    
    try {
        const sql = 'SELECT * FROM user WHERE id_user = ?';
        const values = [id];
        const result = await runQuery(sql, values);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk mengubah data dari suatu dengan id
exports.updateUserById = async (req, res) => {
    const id = req.params.id;
    const { id_user, password_user } = req.body;
    try {
        const sql = 'UPDATE user SET password_user = ? WHERE id_user = ?';
        const values = [ password_user, id ];
        await runQuery(sql, values);
        
        res.status(200).json({ message: 'User updated succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk menghapus user dengan id
exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'DELETE FROM user WHERE id_user = ?';
        const values = [id]
        await runQuery(sql, values);

        res.status(200).json({ message: 'User deleted succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};