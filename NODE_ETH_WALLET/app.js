const express = require('express')
const app = express()
const wallet = require('./wallet')
const sql = require('./SQL')
var Web3 = require('web3');
var web3 = new Web3('https://mainnet.infura.io/v3/YOURINFURAID')
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// some exceptions can be with web3 url's !!!

/* CREATED BY AKIN UGUR AKTAS IN 23 APRIL 2022 FOR THE EDUCATION !


                 |
                 |
                _|_
                \ /
                 V


// WRITE THIS ON SQL QUERY EXECUTE AREA ON MySQL:

-
-
-

USE 'DBNAME';  (  <-- your database name)
CREATE TABLE wallet_test (

  wallet_id int NOT NULL AUTO_INCREMENT,
  wallet_public varchar(100) NOT NULL,
  wallet_private varchar(100) NOT NULL,
  PRIMARY KEY (wallet_id),
  UNIQUE KEY wallet_public_UNIQUE (wallet_public),
  UNIQUE KEY wallet_private_UNIQUE (wallet_private)


  ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-
-
-

*/
var keypair = [] // public and private key pair in a list (empty on create)
var account  // declares a web3.eth account (empty on create)
var private // declares a private key (empty on create)


// '/' middleware method

app.use('/',(req,res,next)=>
{
    console.log('middleware / ')
    
    next()


})

// '/' GET method
app.get('/',(req,res)=>
{
    console.log('GET / ')
    res.sendFile(__dirname+'/views/index.html')
    
    
    

})

// '/new_wallet' middleware method
app.use('/new_wallet',(req,res,next)=>
{
    console.log('middleware /new_wallet ')
    keypair = wallet.createwallet()
    console.log(keypair)
    sql.insertwallet(keypair[0],keypair[1])
    next()

})

// '/new_wallet' GET method
app.get('/new_wallet',(req,res)=>
{
    console.log('GET /new_wallet ')
    res.send(`WALLET CREATED SUCCESFULLY <br> PUBLIC :${keypair[0]} <br> PRIVATE :${keypair[1]}`)
    
    

})

app.use('/import',(req,res,next)=>
{
    console.log('middleware /import ')
    next()
    
})

app.get('/import',(req,res)=>
{
   
    
    console.log('GET /import ')
    res.sendFile(__dirname+'/views/import.html')
    //res.send(`WALLET CREATED SUCCESFULLY <br> PUBLIC :${keypair[0]} <br> PRIVATE :${keypair[1]}`)
    
    
})
app.post('/import',urlencodedParser,(req,res)=>
{

    console.log('POST /import ')
    private = req.body.private
    account = web3.eth.accounts.privateKeyToAccount(req.body.private)
    console.log("PUBLIC KEY : ",account['address'])
    console.log("PRIVATE KEY : ",req.body.private)
    
    
   
   // var balance = web3.eth.getBalance(account['address'])
    web3.eth.getBalance(account['address'], function(err, result) {
        if (err) {
          console.log(err)
        } else {
            
            res.send(`imported 
            <br>public = ${account['address']}
            <br>private = ${req.body.private}  
            <br>balance = ${web3.utils.fromWei(result, "ether")} ETH

            <br> 
            <form action = "/sendeth" method = "POST" >
            <input type = "text" name = amount></input>
            <input type = "submit"> </input>
            </form>
            
            `)

        }
      })

    

})


  

    





app.listen(3030,()=>{
    console.log('SERVER IS LISTENING ON 3030 PORT')
})
