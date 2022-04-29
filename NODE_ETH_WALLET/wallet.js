var Web3 = require("web3");
var web3 = new Web3('https://mainnet.infura.io/v3/869eef6ee7dc46579881b9046bdaf0ce'); 



module.exports.createwallet = 
function createwallet()
{
var account = web3.eth.accounts.create();
// console.log('WALLET CREATED ON WALLET.JS')
const pub_key = account['address']
const priv_key = account['privateKey']
return [pub_key,priv_key]
}

