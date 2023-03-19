const mysql2 = require('mysql2')

export const  query=()=> {
    var con = mysql2.createPool({
        host: 'localhost',
        port: 3306,
        user: "root",
        password: "password",
        database: "awesome",
        connectionLimit: 20
    }).promise()
   return con
}
