const mysql=require('mysql2/promise');
require('dotenv').config();
const myPool=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:urlshortner,
    port:3306,
    waitForConnections:true,
    connectionLimit:100,
    queueLimit:0
});
module.exports=myPool;