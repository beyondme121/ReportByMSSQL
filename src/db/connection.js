var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'report'
});
 
connection.connect();
 
connection.query('SELECT newsTitle from news', function (error, results, fields) {
  if (error) throw error;
  if (results) {
      results.forEach(element => {
          console.log(element.newsTitle)
      });
  }
});
// connection.destroy()
connection.end()