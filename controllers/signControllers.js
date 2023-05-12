const { runQuery } = require('../config/database');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


exports.signUp = async (req, res) => {
    
    try {
        const { id_user, password_user } = req.body;
        const sql = 'SELECT id_user FROM user WHERE id_user = ?';
        const values = [id_user];

        // Cek apakah username sudah digunakan
        const existingUser = await runQuery(sql, values);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'user_id already exists' });
        } else {
            try {
                req.session.id_user = id_user;
                req.session.id_password = id_password;;

                const createUserQuery = 'INSERT INTO user VALUES (?, ?)';
                const values = [id_user, password_user];

                runQuery(createUserQuery, values);

                res.status(200).json({ message: 'User was created succesfully' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.signIn = async (req, res) => {
    const { id_user, password_user } = req.body;

    // Cari pengguna berdasarkan id_user
    const sql = 'SELECT * FROM user WHERE id_user = ?'
    const values = [id_user];

    try {
        const result = await runQuery(sql, values);

        if (result.length > 0) {
            try {
                req.session.id_user = id_user;
                req.session.id_password = password_user;
                res.status(200).json({ message: 'Succesfully signin' });
            } catch (err) {
                console.error(err);
                res.status(401).json({ error: 'Authentication failed' });
            }
        } else  {
            res.status(401).json({ error: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.logOut = async (req, res) => {
    
    try {
        console.log(`sebelum dihancurkan: ${req.session}`)
        req.session.destroy()
        console.log(`setelah dihancurkan: ${req.session}`)

        res.redirect('/api')
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}