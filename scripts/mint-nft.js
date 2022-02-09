require('dotenv').config();
const API_URL = process.env.API_URL;//Connects with the API URL from the .env file
const PUBLIC_KEY = process.env.PUBLIC_KEY;//Connects with the public key from the .env file
const PRIVATE_KEY = process.env.PRIVATE_KEY;//Connects with the private key from the .env file

const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(API_URL);

const contract = require('../artifacts/contracts/nft-v2.sol/nftv2.json');//This is the contract ABI.
//console.log(JSON.stringify(contract.abi));
const contractAddress = '0xdf4040d90362E0f4C19d0a35C5C8B7C370F18Cc8';//This is the address where the contract is deployed.
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);//Here we are using the web3 contract method to create our contract using the ABI and adress.

//This is the function which will create our transaction.
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest');//'Nonce' is used to get the number of transactions that have been sent from the address. Here we will get the latest nonce.

    //The transaction object.
    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': '500000',
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }

    //The transaction signer.
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);//The 'signTransaction' will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network.
    signPromise
    .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          //This is the function for error checking.
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
    })
      .catch((err) => {
        console.log(" Promise failed:", err)
        })
}

//Calling 'mintNFT' function for minting the NFT with hashcode or CID of the metadata file uploaded in pinata
mintNFT(
    'https://gateway.pinata.cloud/ipfs/QmQEoEzxrxNMA48N5Cy9G6LM4TBq58fUgRJ2TQk6xMxJ4R'
);