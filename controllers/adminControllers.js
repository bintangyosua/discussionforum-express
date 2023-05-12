const { db, runQuery } = require('../config/database');


// Fungsi untuk membuat admin baru
exports.createAdmin = async (req, res) => {
    const { id_admin, password_admin } = req.body;

    try {
        const sql = 'INSERT INTO admin VALUES (?, ?)';
        const values = [id_admin, password_admin];

        await runQuery(sql, values);

        res.status(200).json({ message: 'admin has been created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk mendapatkan semua data admin
exports.getAllAdmins = async (req, res) => {
    try {
        const sql = 'SELECT * FROM admin';
        const result = await runQuery(sql);

        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// Fungsi untuk mendapatkan data suatu admin dengan id
exports.getAdminById = async (req, res) => {
    const id = req.params.id;
    
    try {
        const sql = 'SELECT * FROM admin WHERE id_admin = ?';
        const values = [id];
        const result = await runQuery(sql, values);

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk mengubah data dari suatu dengan id
exports.updateAdminById = async (req, res) => {
    const id = req.params.id;
    const { id_admin, password_admin } = req.body;
    try {
        const sql = 'UPDATE admin SET password_admin = ? WHERE id_admin = ?';
        const values = [ password_admin, id ];
        await runQuery(sql, values);

        res.status(200).json({ message: 'admin updated succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Fungsi untuk menghapus admin dengan id
exports.deleteAdminById = async (req, res) => {
    const id = req.params.id;
    try {
        const sql = 'DELETE FROM admin WHERE id_admin = ?';
        const values = [id]
        await runQuery(sql, values);

        res.status(200).json({ message: 'admin deleted succesfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};