pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";

contract SimpleStore {
    struct Item{
        string name;
        uint price;
        address owner;
        string image_hash;
        bool sold;
        address buyer;
    }

    Item[] public items;
    mapping (address => uint[]) public owners;
    mapping (address => uint[]) public buyers;


    function postItem(string memory name, string memory image_hash, uint price) public{
        Item memory new_item = Item(name, price, msg.sender, image_hash, false, address(0));
        owners[msg.sender].push(items.length);

        emit AllItems(items.length, new_item.name, new_item.price, new_item.owner, new_item.image_hash, new_item.sold, new_item.buyer);
        
        items.push(new_item);
        console.log(msg.sender, " posted item");
    }
    event AllItems(uint id, string name, uint price, address owner, string image_hash, bool sold, address buyer);

    function buyItem(uint item_id) public payable{
        require(msg.value >= items[item_id].price, "SimpleStore::buyItem INSUFFICIENT FUNDS!");
        require(items[item_id].sold == false, "SimpleStore::buyItem ITEM IS ALREADY SOLD!");

        payable(items[item_id].owner).transfer(items[item_id].price);
        items[item_id].buyer = msg.sender;
        items[item_id].sold = true;

        emit BoughtItems(item_id, msg.sender);
    }

    event BoughtItems(uint id, address buyer);
}