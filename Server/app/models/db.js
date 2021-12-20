const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: '3306',
  timeout: 60000
});

connection.connect(error => {
  if(error){
    throw error;
  }
  console.log('db successfully connected');
});

module.exports = connection;