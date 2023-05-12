const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proto_bd_project'
});


db.connect((err) => {
    if (err) {
        console.error('Koneksi ke databse gagal: ',err.stack);
        return
    }
    console.log('Terhubung ke database dengan ID: ', db.threadId);
})


const runQuery = (sql, values) => {
    return new Promise(( resolve, reject ) => {
        db.query(sql, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


module.exports = { db, runQuery };