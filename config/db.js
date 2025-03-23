import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '==Fiza123',
  database: 'url_shortener'
});

export default db;
