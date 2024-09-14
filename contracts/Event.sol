// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


//work on this more
//ownable comes in at some point

contract Event {

    struct Events{
        uint256 id;
        string title;
        uint256 date;
        string description;
        address nftTokenAddress;
        address[] attendees;
    }

    mapping (uint256 => Events) public eventDetails;

     mapping(address => mapping(uint256 => bool)) public hasRegistered;

    uint256 public eventCount;


    constructor(){}


    error InvalidEvent();
    error AddressZeroDetected();
    error FieldEmpty();
    error AlreadyRegistered();


    function createEvent(string memory _title,string memory _description, uint256 _date,address _nftTokenAddress) external {    
        if(_nftTokenAddress == address(0)){
            revert AddressZeroDetected();
        }
        if(bytes(_title).length <= 0){
            revert FieldEmpty();
        }
        if(_date <= 0){
            revert FieldEmpty();

        }
        



        eventCount++;

        Events memory  evnt;
        evnt.id = eventCount;
        evnt.description =_description;
        evnt.date = _date;
        evnt.nftTokenAddress = _nftTokenAddress;
        evnt.title = _title;

        uint eventID = eventCount;




        eventDetails[eventID] = evnt;


    }


    function registerEvent(uint256 _eventId, address _nftTokenAddress) external {
        if(_eventId <= 0){
            revert InvalidEvent();
        }
        if(_eventId > eventCount){
            revert InvalidEvent();
        }
        if(_nftTokenAddress == address(0)){
            revert AddressZeroDetected();
        }
        if(hasRegistered[msg.sender][_eventId]){
            revert AlreadyRegistered();
        }

        //check if user possesses NFT
        IERC721 nftContract = IERC721(_nftTokenAddress);

        require(nftContract.balanceOf(msg.sender)>0,"user do not own the required nft");


        //set the hasRegistered to true
        hasRegistered[msg.sender][_eventId] = true;


        //add user to the attendees array
        eventDetails[_eventId].attendees.push(msg.sender);
        


    }




}