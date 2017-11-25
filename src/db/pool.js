let mysql = require('mysql');
const config = require('./dbconfig.js')

let pool = mysql.createPool(config)

pool.getConnection(function (err, connection) {
    // let sql = 'select * from news where newsID =' + connection.escape(2)
    let sql = 'select * from news where newsID = ?'
    // Use the connection
    connection.query(sql, [3], function (error, results, fields) {
        // And done with the connection.
        connection.release();
        // Handle error after the release.
        if (error) throw error;
        if (results) {
            console.log(results)
        }
        // Don't use the connection here, it has been returned to the pool.
    });
});

pool.getConnection((err, conn) => {
    let sql = "select * from ?? where ?? = ?"
    let params = ['news', 'newsID', 4]
    sql = mysql.format(sql, params)
    conn.query(sql, (err, results, fields) => {
        conn.release()
        if (err) throw err
        if (results) {
            console.log(results)
        }
    })
})





pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});

pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});