// lib/db.ts
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
    host: 'localhost',          // or your remote host
    user: 'root',
    password: '',
    database: 'dbrealestate',
});

export default connection;
