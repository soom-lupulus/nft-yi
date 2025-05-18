// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC2981} from "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NFTMarketplace is ERC721URIStorage, ERC2981 {
    // 铸造数量
    uint256 private _tokenIds;
    // 卖出数量
    uint256 private _itemsSold;
    // 主体人
    address payable public owner;
    // NFT藏品映射
    mapping(uint256 => MarketItem) private idMarketItem;
    // 手续费
    uint256 listingPrice = 0.0015 ether;
    // NFT版税豁免
    mapping(uint256 => bool) public isRoyaltyExempt;
    uint96 public constant maxRoyaltyLimit = 2000;

    // 1. 存储Merkle树的根哈希
    bytes32 public merkleRoot;

    /**
     *
     * @param tokenId NFT的id
     * @param seller 卖家
     * @param owner NFT持有人（1.合约，2.用户）
     * @param creator NFT铸造者
     * @param price 出售价格
     * @param sold 是否正在出售
     */
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        address payable creator;
        uint256 price;
        uint96 royaltyPercentage;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        address creator,
        uint256 price,
        uint96 royaltyPercentage,
        bool sold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can change the listing price");
        _;
    }

    constructor() ERC721("I Ching NFT", "ICHINGT") {
        owner = payable(msg.sender);
    }

    // 2. 设置根哈希（仅管理员）
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    // 3. 验证函数
    function checkWhitelisted(
        bytes32[] memory proof,
        address addr,
        uint256 amount
    ) public view returns (bool) {
        if(merkleRoot == bytes32(0)){
            return false;
        }
        bytes32 leaf = keccak256(
            bytes.concat(keccak256(abi.encode(addr, amount)))
        );
        return MerkleProof.verify(proof, merkleRoot, leaf);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * 设置版税
     * @param receiver  版税给谁
     * @param feeBasisPoints 版税 (500 == 5%)
     */
    function setRoyaltyInfo(
        address receiver,
        uint96 feeBasisPoints
    ) public onlyOwner {
        _setDefaultRoyalty(receiver, feeBasisPoints);
    }

    /**
     * 版税豁免
     * @param tokenId NFT tokenId
     * @param exempt 是否豁免
     */
    function setRoyaltyExempt(uint256 tokenId, bool exempt) external onlyOwner {
        isRoyaltyExempt[tokenId] = exempt;
    }

    /**
     * 版税比例修改
     * @param tokenId NFT tokenId
     * @param newPercentage 新的版税比例
     */
    function updateRoyaltyPercentage(
        uint256 tokenId,
        uint96 newPercentage
    ) external {
        require(msg.sender == idMarketItem[tokenId].creator, "Only creator");
        require(newPercentage <= maxRoyaltyLimit, "Max 20%");
        _setTokenRoyalty(tokenId, idMarketItem[tokenId].creator, newPercentage);
        idMarketItem[tokenId].royaltyPercentage = newPercentage;
    }

    /**
     * 获取NFT的版税信息
     * @param tokenId NFT ID
     * @return address 版税接收者
     * @return amount 版税比例
     */
    function getRoyaltyInfo(
        uint256 tokenId
    ) public view returns (address, uint256) {
        return royaltyInfo(tokenId, idMarketItem[tokenId].price);
    }

    /**
     * 允许创作者更新接收地址
     * @param tokenId   tokenId
     * @param newReceiver 新版税接收地址
     */
    function updateRoyaltyReceiver(
        uint256 tokenId,
        address newReceiver
    ) external {
        require(
            msg.sender == idMarketItem[tokenId].creator,
            "Only Creator be allowed to amend"
        );
        _setTokenRoyalty(
            tokenId,
            newReceiver,
            idMarketItem[tokenId].royaltyPercentage
        );
    }

    // 更改市场抽成用户上架NFT的价格
    function updateListingPrice(
        uint256 changedListingPrice
    ) public payable onlyOwner {
        listingPrice = changedListingPrice;
    }

    // 查看用户上架NFT需要支付给市场的价格
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // 上架NFT产品
    function createToken(
        string memory tokenURI,
        uint256 price,
        uint96 royaltyBasisPoints
    ) public payable returns (uint256) {
        require(royaltyBasisPoints <= maxRoyaltyLimit, "Max royalty is 20%");
        require(msg.sender != address(0), "Creator cannot be zero address"); // 避免锁死
        // 更少的gas花费
        ++_tokenIds;
        uint256 newTokenId = _tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        // 设置该NFT的版税（比例由创作者指定）
        _setTokenRoyalty(newTokenId, msg.sender, royaltyBasisPoints);
        createMarketItem(newTokenId, price, royaltyBasisPoints);
        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        uint96 royaltyBasisPoints
    ) private {
        require(price > 0, "price must be at least 1");
        require(
            msg.value == listingPrice,
            "price must be equal to listing price"
        );
        idMarketItem[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(this)),
            creator: payable(msg.sender),
            price: price,
            royaltyPercentage: royaltyBasisPoints,
            sold: false
        });
        _transfer(msg.sender, address(this), tokenId);
        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            msg.sender,
            price,
            royaltyBasisPoints,
            false
        );
    }

    /**
     * 用户上架NFT以出售
     * @param tokenId NFT的id
     * @param price NFT的价格
     */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "you are not the item owner"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        --_itemsSold;
        _transfer(msg.sender, address(this), tokenId);
    }

    /**
     * 交易函数
     * @param tokenId NFT_token id
     */
    function createMarketSale(
        uint256 tokenId,
        bytes32[] memory proof
    ) public payable {
        MarketItem storage item = idMarketItem[tokenId];
        // 白名单检测
        bool isWhitelisted = checkWhitelisted(proof, msg.sender, 1);
        // 计算版税
        (, uint256 royaltyAmount) = royaltyInfo(tokenId, item.price);
        // 确保最小版税，防止版税计算归零
        if (royaltyAmount < 0.0001 ether) {
            royaltyAmount = 0.0001 ether;
            require(
                msg.value >= royaltyAmount + listingPrice,
                "Insufficient payment at royalty"
            );
        }
        // 分配资金
        if (!isWhitelisted) {
            // 普通用户
            require(msg.value == item.price, "Insufficient payment for normal user");
            payable(owner).transfer(listingPrice); // 支付平台手续费
            if (!isRoyaltyExempt[tokenId]) {
                payable(item.creator).transfer(royaltyAmount); // 支付作者版税
                payable(item.seller).transfer(
                    msg.value - royaltyAmount - listingPrice
                ); // 最后给卖家剩余
            } else {
                payable(item.seller).transfer(msg.value - listingPrice);
            }
        }
        // 白名单免手续费、价格九折
        else {
            uint256 discountPrice = (item.price * 90) / 100;
            require(msg.value == discountPrice, "Insufficient payment for vip user");
            if (!isRoyaltyExempt[tokenId]) {
                payable(item.creator).transfer(royaltyAmount); // 支付作者版税
                payable(item.seller).transfer(
                    discountPrice - royaltyAmount
                ); // 最后给卖家剩余
            } else {
                payable(item.seller).transfer(discountPrice);
            }
        }

        // 更新状态
        item.owner = payable(msg.sender);
        item.sold = true;
        item.seller = payable(address(0));
        ++_itemsSold;
        _transfer(address(this), msg.sender, tokenId);
    }

    /**
     * 获取合约中正在卖的所有NFT
     * - 给买家浏览市场上所有可购买的NFT
     */
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds;
        uint256 unSoldItemCount = _tokenIds - _itemsSold;
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unSoldItemCount);
        for (uint256 i = 0; i < itemCount; ++i) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /**
     * 获取我实际拥有的NFT
     * - 铸造后从未出售过的NFT
     * - 从市场买来的NFT
     * - 曾经出售过但又买回来的NFT
     */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint myNFTTotalNum = 0;
        for (uint256 i = 0; i < _tokenIds; ++i) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                ++myNFTTotalNum;
            }
        }
        MarketItem[] memory myNFTItems = new MarketItem[](myNFTTotalNum);
        uint256 myNFTItemsIndex = 0;
        for (uint256 j = 0; j < _tokenIds; ++j) {
            if (idMarketItem[j + 1].owner == msg.sender) {
                myNFTItems[myNFTItemsIndex++] = idMarketItem[j + 1];
            }
        }
        return myNFTItems;
    }

    /**
     * 获取我挂单但还没卖出去的NFT
     * - 正在市场上挂着卖的
     * - 之前挂过但后来下架的
     */
    function fetchItemListed() public view returns (MarketItem[] memory) {
        uint itemCount = 0;
        for (uint256 i = 0; i < _tokenIds; ++i) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                ++itemCount;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 itemsIndex = 0;
        for (uint256 j = 0; j < _tokenIds; ++j) {
            if (idMarketItem[j + 1].seller == msg.sender) {
                uint256 currentId = j + 1;
                items[itemsIndex] = idMarketItem[currentId];
                ++itemsIndex;
            }
        }
        return items;
    }
}
