

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