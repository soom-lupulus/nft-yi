import { ethers } from 'hardhat'

const contractName = 'NFTMarketplace';

/**
 * 获取合约 --> 执行部署 --> 等待部署 --> 【获取合约信息】--> 等待区块数据同步 --> 验证合约
 */
(async () => {
    const NFTMarketplace = await ethers.getContractFactory(contractName);
    const nftMarketplace = await NFTMarketplace.deploy();
    console.log(`---执行部署${contractName}合约---`)
    // 等待部署
    await nftMarketplace.waitForDeployment()
    // 获取合约地址
    const nftMarketplaceAddress = nftMarketplace.target
    console.log(
        `---${contractName}合约部署成功，合约地址为：${nftMarketplaceAddress}---`,
    )

})()
    .then()
    .catch(err => {
        console.log(err)
        process.exit(1)
    })
