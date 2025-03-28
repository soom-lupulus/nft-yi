// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {
    // 铸造数量
    uint256 private _tokenIds;
    // 卖出数量
    uint256 private _itemsSold;
    // 主体人
    address payable owner;
    // NFT藏品映射
    mapping(uint256 => MarketItem) private idMarketItem;

    uint256 listingPrice = 0.0015 ether;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        // 出售状态
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner can change the listing price");
        _;
    }

    constructor() ERC721("I Ching NFT", "ICHINGT") {
        owner = payable(msg.sender);
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
        uint256 price
    ) public payable returns (uint256) {
        // 更少的gas花费
        ++_tokenIds;
        uint256 newTokenId = _tokenIds;
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "price must be at least 1");
        require(msg.value == price, "price must be equal to listing price");
        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );
        _transfer(msg.sender, address(this), tokenId);
        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

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
    function createMarketSale(uint256 tokenId) public payable {
        require(
            msg.value == idMarketItem[tokenId].price,
            "asking price is not legal to complete the transaction"
        );
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));
        ++_itemsSold;
        _transfer(address(this), msg.sender, tokenId);
        // 支付手续费
        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    /**
     * 获取所有未交易的NFT
     */
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds;
        uint256 unSoldItemCount = _tokenIds - _itemsSold;
        uint256 currentIndex = 0;
        MarketItem[] memory items = new MarketItem[](unSoldItemCount);
        for(uint256 i = 0; i < itemCount; ++i){
            if(idMarketItem[i+1].owner == address(this)){
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /**
     * 获取用户的NFT
     */
    function fetchMyNFT() public view returns(MarketItem[] memory){
        uint myNFTTotalNum = 0;
        for(uint256 i = 0; i < _tokenIds; ++i){
            if(idMarketItem[i+1].owner == msg.sender){
                ++myNFTTotalNum;
            }
        }
        MarketItem[] memory myNFTItems = new MarketItem[](myNFTTotalNum);
        uint256 myNFTItemsIndex = 0;
        for(uint256 j = 0; j < _tokenIds; ++j){
            if(idMarketItem[j+1].owner == msg.sender){
                myNFTItems[++myNFTItemsIndex] = idMarketItem[j+1];
            }
        }
        return myNFTItems;
    }
    /**
     * 获取我出售的NFT
     */
    function fetchItemListed() public view returns(MarketItem[] memory){
        uint itemCount = 0;
        for(uint256 i = 0; i < _tokenIds; ++i){
            if(idMarketItem[i+1].seller == msg.sender){
                ++itemCount;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 itemsIndex = 0;
        for(uint256 j = 0; j < _tokenIds; ++j){
            if(idMarketItem[j+1].seller == msg.sender){
                uint256 currentId = j + 1;
                items[itemsIndex] = idMarketItem[currentId];
                ++itemsIndex;
            }
        }
        return items;
    }
}
