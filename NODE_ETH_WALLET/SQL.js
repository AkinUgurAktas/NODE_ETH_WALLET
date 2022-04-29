var mysql = require('mysql')


var con = mysql.createConnection(
    {
        host:'localhost',
        user:'akin',
        password:'admin1234',
        database:'web3'
    
    
    })
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });




module.exports.insertwallet =  
function insertwallet(public,private)
{
    con.query(`INSERT INTO wallet_test (wallet_public,wallet_private) values ('${public}','${private}')`,(err, result, fields) =>
    {
        if (err) throw err;
        console.log(`WALLET INSERTED TO TABLE SUCCESFULLY \nPUBLIC KEY: ${public}\nPRIVATE KEY: ${private}`)
    })
    
}
module.exports.con = con