# NFT tutorial from ethereum.org

Completed: Yes
Link: https://ethereum.org/en/developers/tutorials/how-to-write-and-deploy-an-nft
Rating (Out of 5): 4.5
Type: Webpage

# Best for beginners

This tutorial is offered from  [ethereum.org](http://ethereum.org) and it’s a real gem. All the steps are well described and very suitable for beginners. Here are the steps it follows.

### What is “Minting an NFT”?

“Minting an NFT” is the act of publishing a unique instance of your ERC-721 token on the blockchain. 

In this tutorial we will learn how to deploy and mint an NFT. 

Let’s get started.

### 1. Connecting to ethereum network

Here we are connecting to ethereum network using Alchemy’s API, which by the way is very comfortable to use rather than infura’s API (at least in my case). We are choosing ropsten test network for this deployment and ‘staging’ for environment.

### 2. Creating ethereum account

We are using (of course) ‘metamask’ for creating our ethereum account. Also add ehters from the [Ropsten Ethereum Faucet](https://faucet.ropsten.be/).

### 3. Using VSCode and initializing the project

I always use VSCode for coding. I am creating a directory named “nft-contract-v2’ for the project. Enter the below command to initialize the project.

npm init

and answer the questions like this.

```jsx
package name: (nft-contract-v2)
2version: (1.0.0)
3description: NFT Contract Version 2
4entry point: (index.js)
5test command:
6git repository:
7keywords:
8author:
9license: (ISC)
10About to write to /Users/thesuperb1/Desktop/my-nft/package.json:
11

12{
13  "name": "nft-contract-v2",
14  "version": "1.0.0",
15  "description": "NFT Contract Version 2",
16  "main": "index.js",
17  "scripts": {
18    "test": "echo \"Error: no test specified\" && exit 1"
19  },
20  "author": "",
21  "license": "ISC"
```

### 4. Using HARDHAT

Let use HardHat for for our development environment. Run the following command to install it.

npm install --save-dev hardhat

Create a Hardhat project by running this command inside project folder.

npx hardhat

We would then see a welcome message and option to select what you want to do. Select “create an empty hardhat.config.js”:

```jsx
888    888                      888 888               888
2888    888                      888 888               888
3888    888                      888 888               888
48888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
5888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
6888    888 .d888888 888    888  888 888  888 .d888888 888
7888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
8888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
9👷 Welcome to Hardhat v2.0.11 👷‍
10? What do you want to do? …
11Create a sample project
12❯ Create an empty hardhat.config.js
13Quit
```

This will generate a hardhat.config.js (This is a very important file) file for us to play with. We will specify all our setup configuration in this file.

### 5. Adding project folders

We will need to create these two folders for our project.

- contracts (Here we will keep our NFT smart contract code)
- scripts (Here we will keep our scripts to deploy and interact with our smart contracts)

### 6. Writing our smart contract

Inside our contract folder we will create a file named nft-v2.sol. Following is the code we will write inside the file.

```solidity
//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721] (https://docs.openzeppelin.com/contracts/3.x/erc721)
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract nftv2 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721('nftv2', 'NFT') {}

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns(uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
       
}
```

One thing to do which is very important to run our contract is to install OpenZeppelin, because we are inheriting classes from the OpenZeppelin. Just run the following command in the terminal to install it.

 npm install --save-dev @openzeppelin/contracts

So, what does this code *do* exactly? Let’s break it down, line-by-line.

At the top of our smart contract, we import three [OpenZeppelin](https://openzeppelin.com/) smart contract classes:

- @openzeppelin/contracts/token/ERC721/ERC721.sol contains the implementation of the ERC-721 standard, which our NFT smart contract will inherit. (To be a valid NFT, your smart contract must implement all the methods of the ERC-721 standard.) To learn more about the inherited ERC-721 functions, check out the interface definition [here](https://eips.ethereum.org/EIPS/eip-721).
- @openzeppelin/contracts/utils/Counters.sol provides counters that can only be incremented or decremented by one. Our smart contract uses a counter to keep track of the total number of NFTs minted and set the unique ID on our new NFT. (Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existence. For example, the first NFT we mint with our smart contract has an ID of "1," our second NFT has an ID of "2," etc.)
- @openzeppelin/contracts/access/Ownable.sol sets up [access control](https://docs.openzeppelin.com/contracts/3.x/access-control) on our smart contract, so only the owner of the smart contract (you) can mint NFTs. (Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word Ownable on line 10 and onlyOwner on line 17.)

After our import statements, we have our custom NFT smart contract, which is surprisingly short — it only contains a counter, a constructor, and single function! This is thanks to our inherited OpenZeppelin contracts, which implement most of the methods we need to create an NFT, such as `ownerOf` which returns the owner of the NFT, and `transferFrom`, which transfers ownership of the NFT from one account to another.

In our ERC-721 constructor, you’ll notice we pass 2 strings, “nftv2” and “NFT.” The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

Finally, we have our function `mintNFT(address recipient, string memory uri)` that allows us to mint an NFT! You'll notice this function takes in two variables:

- `address recipient` specifies the address that will receive your freshly minted NFT
- `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

`mintNFT` calls some methods from the inherited ERC-721 library, and ultimately returns a number that represents the ID of the freshly minted NFT.

### 7. Connecting Metamask and Alchemy to out project

Now let’s connect our Metamask wallet, Alchemy account and our smart contract together.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

To learn more about sending transactions, check out [this tutorial](https://ethereum.org/en/developers/tutorials/sending-transactions-using-web3-and-alchemy/) on sending transactions using web3.

Firstly, install the dotenv package in our project directory.

npm install --save-dev dotenv 

Then, create a .env file in the root directory of our project, and add your MetaMask private key and HTTP Alchemy API URL to it.

- Follow [these instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) to export your private key from MetaMask
- For getting HTTP Alchemy API Key follow the instructions below.
1. Login to your Alchemy account and click on ‘View Details’ button beside your app name.
    
    ![Alchemy-1.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Alchemy-1.png)
    
2. Then click on the ‘View Key’ button and copy the HTTP code to your clipboard.
    
    ![Alchemy-2.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Alchemy-2.png)
    
    Our .env file should look like this now.
    
    ```
    1  API_URL="https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    2  PRIVATE_KEY="your-metamask-private-key"
    
    ```
    
    To actually connect these to our smart contract, we will reference these variables in our ‘hardhat.config.js’ file later.
    
    ### 8. Installing Ethers.js
    
    Ethers.js is a library that makes it easier to interact and make requests to Ethereum by wrapping [standard JSON-RPC methods](https://ethereum.org/en/developers/docs/apis/json-rpc/) with more user friendly methods.
    
    Hardhat makes it super easy to integrate [Plugins](https://hardhat.org/plugins/) for additional tooling and extended functionality. We’ll be taking advantage of the [Ethers plugin](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) for contract deployment ([Ethers.js](https://github.com/ethers-io/ethers.js/) has some super clean contract deployment methods).
    
    To install ethers.js type the following inside our project directory
    
    npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0
    
    ### 9. Updating hardhat.config.js
    
    We’ve added several dependencies and plugins so far, now we need to update hardhat.config.js so that our project knows about all of them.
    
    We will update your hardhat.config.js to look like this:
    
    ```jsx
    /**
     * @type import('hardhat/config').HardhatUserConfig
     */
    require('dotenv').config();
    require('@nomiclabs/hardhat-ethers');
    const {API_URL, PRIVATE_KEY} = process.env;
    module.exports = {
      solidity: "0.8.4",
      defaultNetwork: "ropsten",
      networks: {
        hardhat: {},
        ropsten: {
          url: API_URL,
          accounts: [`0x${PRIVATE_KEY}`]
        }
      }
    };
    ```
    
    ### 10. Compiling our contract
    
    To make sure everything is working so far, let’s compile our contract. The compile task is one of the built-in hardhat tasks.
    
    From the command line run:
    
    npx hardhat compile
    
    You might get a warning about SPDX license identifier not provided in source file , but no need to worry about that — hopefully everything else looks good! If not, you can always message in the [Alchemy discord](https://discord.gg/u72VCg3).
    
    ### 11. Writing script to deploy the contract
    
    Now we will write a script inside our ‘scripts’ folder to deploy our contract.
    
    Create a file named ‘deploy.js’ inside the ‘scripts’ folder and add the following code.
    
    ```jsx
    async function main() {
        const nftv2 = await ethers.getContractFactory("nftv2");
    
        //Start the deployment process, returning a promise that resolves to a contract address.
        const NFTv2 = await nftv2.deploy();
        await NFTv2.deployed();
        console.log('Contract deployed to address: ', NFTv2.address);
    };
    
    main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });
    ```
    
    You can get error sometimes, when vscode will automatically generate the following code inside this script.
    
    ```jsx
    const { ethers } = require("ethers");
    ```
    
    Just remove the line and you will be good to go.
    
    Now coming back to our script.
    
    Hardhat does an amazing job of explaining what each of these lines of our deploy.js does in their [Contracts tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), we’ve adopted their explanations here.
    
    ```jsx
    const nftv2 = await ethers.getContractFactory("nftv2");
    ```
    
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so MyNFT here is a factory for instances of our NFT contract. When using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default.
    
    ```jsx
    const NFTv2 = await nftv2.deploy();
    ```
    
    Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of our smart contract functions.
    
    ### 12. Deploying our smart contract to ropsten
    
    Now lets deploy our smart contract to ropsten network by running the following command in our project directory.
    
    npx hardhat --network ropsten run scripts/deploy.js
    
    We should see something like this after a few seconds.
    
    > Contract deployed to address: 0x236406A46679853B51BB7411C72706C15246f690
    > 
    
    If we go to the [Ropsten etherscan](https://ropsten.etherscan.io/)
     and search for our contract address we should able to see that it has been deployed successfully.
    
    ![Ropsten etherscan-1.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Ropsten_etherscan-1.png)
    
    <aside>
    💡 Remember to save the contract address in a txt file (may be in your project directory). Because we will be needing this address in future whenever we will interact with our smart contract. You can also find the address anytime in ropsten etherscan by looking up the metamask address you used to deploy the contract. But it is convenient to save it in a file to speed up the work.
    
    </aside>
    
    If we click the ‘transaction hash’ we will see that the from address matches our metamak address and the to address will be our contract adress.
    
    ![Ropsten etherscan-2.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Ropsten_etherscan-2.png)
    
    ### That’s mean we just deployed our NFT smart contract to ethereum chain.
    
    To understand what’s going on under the hood, let’s navigate to the Explorer tab in our [Alchemy dashboard](https://dashboard.alchemyapi.io/explorer) 
    . If you have multiple Alchemy apps make sure to filter by app and select “MyNFT”.
    
    ![Alchemy-3.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Alchemy-3.png)
    
    Here you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the .deploy() function. Two important ones to call out here are [eth_sendRawTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)
    , which is the request to actually write our smart contract onto the Ropsten chain, and [eth_getTransactionByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)
     which is a request to read information about our transaction given the hash (a typical pattern when sending transactions). To learn more about sending transactions, check out this tutorial on [sending transactions using Web3](https://ethereum.org/en/developers/tutorials/sending-transactions-using-web3-and-alchemy/).
    
    ### 13. Installing Web3
    
    Web3 is similar to Ethers.js, as it is a library used to make creating requests to the Ethereum blockchain easier. In this step we’ll be using [Alchemy Web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3), which is an enhanced web3 library that offers automatic retries and robust WebSocket support.
    
    In our project directory enter the command:
    
    npm install --save-dev @alch/alchemy-web3
    
    ### 14. Creating mint-nft.js file
    
    Inside our scripts directory, create a mint-nft.js file and add the following lines of code:
    
    ```jsx
    require("dotenv").config()
    const API_URL = process.env.API_URL
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
    const web3 = createAlchemyWeb3(API_URL)
    ```
    
    ### 15. Getting the Smart Contract’s ABI
    
     Our contract ABI (Application Binary Interface) is the interface to interact with our smart contract. You can learn more about Contract ABIs [here](https://docs.alchemyapi.io/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat automatically generates an ABI for us and saves it in the “nftv2.json” file. In order to use this we’ll need to parse out the contents by adding the following lines of code to our mint-nft.js file:
    
    ```jsx
    const contract = require('../artifacts/contracts/nft-v2.sol/nftv2.json');
    ```
    
    If we want to see the ABI, we can print it in our console:
    
    ```jsx
    console.log(JSON.stringify(contract.abi))
    ```
    
    Then run the following code and see the ABI printed in the console:
    
    node scripts/mint-nft.js
    
    ### 16. Configuring the Metadata of our NFT using IPFS
    
    If you can remember, our “nft-v2” smart contract function takes in a tokenURI parameter that should resolve to a JSON document describing the NFT's metadata— which is really what brings the NFT to life, allowing it to have configurable properties, such as a name, description, image, and other attributes.
    
    > *Interplanetary File System (IPFS) is a decentralized protocol and peer-to-peer network for storing and sharing data in a distributed file system.*
    > 
    
    We will use Pinata, a convenient IPFS API and toolkit, to store our NFT asset and metadata to ensure our NFT is truly decentralized. If you don’t have a Pinata account, sign up for a free account [here](https://app.pinata.cloud/) and complete the steps to verify your email.
    
    Once the account is created:
    
    - Navigate to the “Files” page and click the blue "Upload" button at the top-left of the page.
    - Upload an image to pinata — this will be the image asset for your NFT. Feel free to name the asset whatever you wish
    - After you upload, you'll see the file info in the table on the Files page. You'll also see a CID column. You can copy the CID by clicking the copy button next to it. You can view your upload at: `https://gateway.pinata.cloud/ipfs/<CID>`. You can find the image we used on IPFS [here](https://gateway.pinata.cloud/ipfs/QmV1EMLsGNyfCSRpbHH9nQ8dGkYn8PDnoEx2fYP6gtz9CQ/1.png), for example.
    
    Now, we’re going to want to upload one more document to Pinata. But before we do that, we need to create it!
    
    In your root directory, make a new file called nft-metadata.json and add the following json code:
    
    ```json
    {
      "name": "Your Collection #1",
      "description": "Remember to replace this description",
      "image": "ipfs://QmV1EMLsGNyfCSRpbHH9nQ8dGkYn8PDnoEx2fYP6gtz9CQ/1.png",
      "dna": "59ed9aa1f8dba18e866485aeda070367f75a8c6f",
      "edition": 1,
      "date": 1643738065007,
      "attributes": [
        {
          "trait_type": "Background",
          "value": "Black"
        },
        {
          "trait_type": "Eyeball",
          "value": "Red"
        },
        {
          "trait_type": "Eye color",
          "value": "Yellow"
        },
        {
          "trait_type": "Iris",
          "value": "Small"
        },
        {
          "trait_type": "Shine",
          "value": "Shapes"
        },
        {
          "trait_type": "Bottom lid",
          "value": "Low"
        },
        {
          "trait_type": "Top lid",
          "value": "Middle"
        }
      ],
      "compiler": "HashLips Art Engine"
    }
    ```
    
    Feel free to change the data in the json. You can remove or add to the attributes section. Most importantly, make sure image field points to the location of your IPFS image — otherwise, your NFT will include a photo of an (purple) eye.
    
    Once you’re done editing the json file, save it and upload it to Pinata, following the same steps we did for uploading the image.
    
    ### 17. Creating an instance of our smart contract
    
    Now, to interact with our contract, we need to create an instance of it in our code. To do so we’ll need our contract address which we can get from the deployment or [Etherscan](https://ropsten.etherscan.io/) by looking up the address you used to deploy the contract.
    
    Next we will use the web3 [contract method](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) to create our contract using the ABI and address. In your mint-nft.js file, add the following:
    
    ```jsx
    const contractAddress = "0x236406A46679853B51BB7411C72706C15246f690"
    
    const nftContract = new web3.eth.Contract(contract.abi, contractAddress)
    ```
    
    ### 18. Updating the .env file
    
    Now, in order to create and send transactions to the Ethereum chain, we’ll use your public ethereum account address to get the account nonce.
    
    > The nonce specification is used to keep track of the number of transactions sent from your address — which we need for security purposes and to prevent [replay attacks](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). To get the number of transactions sent from your address, we use [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
    > 
    
    Add your public key to your .env file — if you completed part 1 of the tutorial, our .env file should now look like this:
    
    ```jsx
    API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
    PRIVATE_KEY = "your-private-account-address"
    PUBLIC_KEY = "your-public-account-address"
    ```
    
    ### 19. Creating our transaction
    
    First, let’s define a function named `mintNFT(tokenData)` and create our transaction by doing the following:
    
    1. Grab your *PRIVATE_KEY* and *PUBLIC_KEY* from the `.env` file.
    2. Next, we’ll need to figure out the account nonce. 
    3. Finally we’ll set up our transaction with the following info:
    - `'from': PUBLIC_KEY` — The origin of our transaction is our public address
    - `'to': contractAddress` — The contract we wish to interact with and send the transaction
    - `'nonce': nonce` — The account nonce with the number of transactions send from our address
    - `'gas': estimatedGas` — The estimated gas needed to complete the transaction
    - `'data': nftContract.methods.mintNFT(PUBLIC_KEY, md).encodeABI()` — The computation we wish to perform in this transaction — which in this case is minting a NFT
    
    Our mint-nft.js file should look like this now:
    
    ```jsx
    require('dotenv').config();
       const API_URL = process.env.API_URL;
       const PUBLIC_KEY = process.env.PUBLIC_KEY;
       const PRIVATE_KEY = process.env.PRIVATE_KEY;
    
       const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
       const web3 = createAlchemyWeb3(API_URL);
    
       const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
       const contractAddress = "0xdf4040d90362E0f4C19d0a35C5C8B7C370F18Cc8";
       const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
    
       async function mintNFT(tokenURI) {
         const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    
       //the transaction
         const tx = {
           'from': PUBLIC_KEY,
           'to': contractAddress,
           'nonce': nonce,
           'gas': 500000,
           'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
         };
       }
    ```
    
    ### 20. Signing the transaction
    
    Now that we’ve created our transaction, we need to sign it in order to send it off. Here is where we’ll use our private key.
    
    `web3.eth.sendSignedTransaction` will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network. You'll notice in the transaction signing section, we've added some error checking so we know if our transaction successfully went through.
    
    ```jsx
    require('dotenv').config();
       const API_URL = process.env.API_URL;
       const PUBLIC_KEY = process.env.PUBLIC_KEY;
       const PRIVATE_KEY = process.env.PRIVATE_KEY;
    
       const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
       const web3 = createAlchemyWeb3(API_URL);
    
       const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
       const contractAddress = "0xdf4040d90362E0f4C19d0a35C5C8B7C370F18Cc8";
       const nftContract = new web3.eth.Contract(contract.abi, contractAddress);
    
       async function mintNFT(tokenURI) {
         const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
    
    //the transaction
      const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
      }
    
      const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
      signPromise
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
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
    ```
    
    ### 21. Calling mintNFT and running node contract-interact.js
    
    Remember the metadata.json you uploaded to Pinata? Get its CID from Pinata and pass the following as parameter to the function mintNFT `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>`
    
    It’s very simple. Just click the copy button at the end of the CID.
    
    ![Pinata-1.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Pinata-1.png)
    
    Double check that the hashcode you copied links to your **metadata.json** by loading `https://gateway.pinata.cloud/ipfs/<metadata-hash-code>` into a separate window. The page should look similar to the screenshot below:
    
    ![Pinata-2.png](NFT%20tutorial%20from%20ethereum%20org%209f7b6b2f906547258b509ff067c2101e/Pinata-2.png)
    
    Altogether, your code should look something like this:
    
    ```jsx
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
    ```
    
    Now, run `node scripts/mint-nft.js` to deploy your NFT. After a couple of seconds, you should see a response like this in your terminal:
    
    ```bash
    The hash of your transaction is: 0x10e5062309de0cd0be7edc92e8dbab191aa2791111c44274483fa766039e0e00
    
    Check Alchemy's Mempool to view the status of your transaction!
    ```
    
    Next, visit your [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) to see the status of your transaction (whether it’s pending, mined, or got dropped by the network). If your transaction got dropped, it’s also helpful to check [Ropsten Etherscan](https://ropsten.etherscan.io/) and search for your transaction hash.
    
    ### And that’s how we have successfully deployed and minted an NFT on the ethereum blockchain.
    
    Using the mint-nft.js you can mint as many NFT's as your heart (and wallet) desires! Just be sure to pass in a new tokenURI describing the NFT's metadata (otherwise, you'll just end up making a bunch of identical ones with different IDs).
    
    ### 22. Adding the minted NFT in Metamask account
    
    If we want to see the minted NFT in  our metamask account we need to follow the steps below.
    
    As a prerequisite, you should already have MetaMask on mobile installed, and it should include the account to which you minted your NFT — you can get the app for free on [iOS](https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202)
     or [Android](https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US).
    
    - Set the network to ropsten: At the top of the app, press the “Wallet” button, after which you’ll be prompted to select a network. As our NFT was minted on the Ropsten network, you’ll want to select Ropsten as your network.
    - Add your NFT to metamask: Once you’re on the Ropsten network, select the “NFTs” tab on the right and add the NFT smart contract address and the ERC-721 token ID of your NFT — which you should be able to find on Etherscan based on the transaction hash from your NFT deployed.
    
    You may need to refresh a few times to view your NFT.
    
    That is the end of the tutorial and hope you have enjoyed it. Feel free to add comments and create issues in my `[github repo](https://github.com/maruf037/NFT-Contract-V2.git)`.