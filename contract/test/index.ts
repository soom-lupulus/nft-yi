import { expect } from "chai"
import { ethers } from "hardhat"
import type { NFTMarketplace } from "../typechain-types";
import type { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'

describe("NFTMarketplace 完整测试套件", function () {
    let nftMarketplace: NFTMarketplace;
    let owner: HardhatEthersSigner, buyer: HardhatEthersSigner, ygg: HardhatEthersSigner;

    beforeEach(async () => {
        // 获取测试账户
        [owner, buyer, ygg] = await ethers.getSigners()

        // 部署合约
        const NFTMarketplaceFactory = await ethers.getContractFactory('NFTMarketplace')
        nftMarketplace = await NFTMarketplaceFactory.deploy()
        await nftMarketplace.waitForDeployment()
    })
    describe("基础功能", function () {
        // 测试1：检查合约部署
        it("应该正确设置合约拥有者", async function () {
            expect(await nftMarketplace.owner()).to.equal(owner.address);
        });

        // 测试2：测试NFT铸造
        it("应该能成功铸造NFT", async function () {
            const tokenURI = "https://example.com/nft1";
            const price = ethers.parseEther("1"); // 1 ETH
            const royalty = 500; // 5%版税

            await nftMarketplace.createToken(tokenURI, price, royalty, {
                value: ethers.parseEther('0.0015') // 手续费
            })

            // 检查NFT总数
            const marketItems = await nftMarketplace.fetchMarketItem();
            expect(marketItems.length).to.equal(1);
            expect(marketItems[0].price).to.equal(price);
        })

        // 测试3：测试购买NFT
        it("应该能成功购买NFT", async function () {
            // 先铸造一个NFT
            const tokenURI = "https://example.com/nft1";
            const price = ethers.parseEther("1"); // 1 ETH
            const royalty = 500; // 5%版税
            await nftMarketplace.createToken(tokenURI, price, royalty, {
                value: ethers.parseEther('0.0015') // 手续费
            })

            // 用另一个账户购买
            await nftMarketplace.connect(buyer).createMarketSale(1, [], {
                value: ethers.parseEther('1') // 支付1 ETH
            })

            // 3. 验证所有权
            const ownerOfToken = await nftMarketplace.ownerOf(1);
            expect(ownerOfToken).to.equal(buyer.address)

            // 检查NFT所有者是否变成买家
            const mynfts = await nftMarketplace.connect(buyer).fetchMyNFTs();
            console.log("fetchMyNFTs返回结果:", mynfts);

            expect(mynfts.length).to.equal(1)
            expect(mynfts[0].owner).to.equal(buyer.address)
        });
    });

    describe("白名单功能", function () {
        // 上述白名单测试
        let merkleTree: StandardMerkleTree<(string | number)[]>;
        // 账户地址证明
        let proof: string[];

        beforeEach(async () => {
            const leaves = [
                [buyer.address, 1]
            ]
            // 构建Merkle树
            merkleTree = StandardMerkleTree.of(leaves, ["address", "uint256"])
            // 设置Merkle根
            await nftMarketplace.setMerkleRoot(merkleTree.root)
            // 获取proof（包含address和amount）
            proof = merkleTree.getProof(leaves[0])
        });

        it("白名单用户应享受折扣", async function () {
            // 铸造NFT
            await nftMarketplace.createToken("uri", ethers.parseEther("1"), 500, {
                value: ethers.parseEther("0.0015")
            });

            // 白名单购买（应支付0.9 ETH）
            await expect(
                nftMarketplace.connect(buyer).createMarketSale(1, proof, {
                    value: ethers.parseEther("0.9")
                })
            ).to.changeEtherBalance(buyer, ethers.parseEther("-0.9"));
        });

        it("非白名单用户应支付全款", async function () {
            await nftMarketplace.setMerkleRoot(ethers.ZeroHash);

            await nftMarketplace.createToken("uri", ethers.parseEther("1"), 500, {
                value: ethers.parseEther("0.0015")
            });

            // 全款支付
            await expect(
                nftMarketplace.connect(buyer).createMarketSale(1, [], {
                    value: ethers.parseEther("1") // 总支付金额
                })
            ).to.changeEtherBalance(buyer, ethers.parseEther("-1")); // 总支出验证

            // 尝试支付不足金额
            await expect(
                nftMarketplace.connect(buyer).createMarketSale(1, [], {
                    value: ethers.parseEther("0.9")
                })
            ).to.be.revertedWith("Insufficient payment for normal user");

            // 多支付
            await expect(
                nftMarketplace.connect(buyer).createMarketSale(1, [], {
                    value: ethers.parseEther("1.1")
                })
            ).to.be.revertedWith("Insufficient payment for normal user");
        });
    });

    describe("版税系统", function () {
        const royaltyPercentage = 500; // 5%
        const price = ethers.parseEther("1")
        let tokenId: number;

        beforeEach(async () => {
            // 铸造一个带版税的NFT
            const tx = await nftMarketplace.connect(ygg).createToken(
                "https://example.com/nft1",
                price,
                royaltyPercentage,
                { value: ethers.parseEther("0.0015") }
            );
            await tx.wait();
            tokenId = 1;
        });
        // 上述版税测试
        it("版税金额和收款账户应该计算正确", async function () {
            const [receiver, royalty] = await nftMarketplace.getRoyaltyInfo(tokenId)
            // 默认是owner创建的
            expect(receiver).to.equal(ygg.address)
            // 版税应该是0.05 ether
            expect(royalty).to.equal(ethers.parseEther('0.05'))
        })
        it("版税豁免后应不收取版税", async function () {
            // 设置豁免
            await nftMarketplace.setRoyaltyExempt(tokenId, true);
            const listingPrice = await nftMarketplace.getListingPrice()
            await nftMarketplace.connect(buyer).createMarketSale(tokenId, [], {
                value: price
            })
            const yggOriginBalance = await ethers.provider.getBalance(ygg)
            await nftMarketplace.connect(buyer).resellToken(tokenId, price, {
                value: listingPrice
            });
            await nftMarketplace.connect(owner).createMarketSale(tokenId, [], {
                value: price
            })
            const yggFinalBalance = await ethers.provider.getBalance(ygg)
            expect(yggFinalBalance - yggOriginBalance).to.equal(0)
        });

        it("应允许创作者更新版税接收地址", async function () {
            const newReceiver = ethers.Wallet.createRandom().address;
            
            // 使用creator身份调用（owner是创建者）
            await nftMarketplace.connect(ygg).updateRoyaltyReceiver(tokenId, newReceiver);
            
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [receiver, _] = await nftMarketplace.getRoyaltyInfo(tokenId);
            expect(receiver).to.equal(newReceiver);
        });

        it("应允许创作者更新版税比例", async function () {
            const newPercentage = 1000; // 10%
            
            await nftMarketplace.connect(ygg).updateRoyaltyPercentage(tokenId, newPercentage);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, amount] = await nftMarketplace.getRoyaltyInfo(tokenId);
            expect(amount).to.equal(ethers.parseEther("0.1")); // 1 ETH的10%
        });

        it("非创作者不能修改版税信息", async function () {
            await expect(
                nftMarketplace.connect(buyer).updateRoyaltyPercentage(tokenId, 100)
            ).to.be.revertedWith("Only creator");
    
            await expect(
                nftMarketplace.connect(buyer).updateRoyaltyReceiver(tokenId, buyer.address)
            ).to.be.revertedWith("Only Creator be allowed to amend");
        });

        it("版税比例不能超过20%", async function () {
            await expect(
                nftMarketplace.connect(ygg).updateRoyaltyPercentage(tokenId, 2001) // 20.01%
            ).to.be.revertedWith("Max 20%");
        });

        describe("资金流向", function () {
            let listingPrice: bigint
            let yggOriginBalance: bigint
            let yggFinalBalance: bigint
            this.beforeEach(async () => {
                listingPrice = await nftMarketplace.getListingPrice()
                yggOriginBalance = await ethers.provider.getBalance(ygg)
                await nftMarketplace.connect(buyer).createMarketSale(tokenId, [], {
                    value: price
                })
                yggFinalBalance = await ethers.provider.getBalance(ygg)
            })
            it("作者作为卖家应该收到正确的版税", async function () {
                // 作为seller，应该获取：1 eth - 0.0015 eth(listingprice)，自己不扣版税
                const expectedGain = price - listingPrice
                expect(yggFinalBalance - yggOriginBalance).to.equal(expectedGain)
            })
            it("作者不参与交易，应当只获取版税", async function () {
                await nftMarketplace.connect(buyer).resellToken(tokenId, price, {
                    value: listingPrice
                })
                await nftMarketplace.connect(owner).createMarketSale(tokenId, [], {
                    value: price
                })
                const yggFinalBalanceAfterOwnerBought = await ethers.provider.getBalance(ygg)
                expect(yggFinalBalanceAfterOwnerBought - yggFinalBalance).to.equal(ethers.parseEther('0.05'))
            })
        })

    });

    describe("边界条件", function () {
        // 边界测试
    });

    describe("事件验证", function () {
        // 事件测试
    });
});
