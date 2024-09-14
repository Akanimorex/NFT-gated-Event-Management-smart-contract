// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//0x9d83e140330758a8fFD07F8Bd73e86ebcA8a5692

contract SimpleNFT is ERC721, Ownable {
    uint256 private _tokenIds;

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {}

    function mint(address to) public onlyOwner returns (uint256) {
        _tokenIds++;
        _safeMint(to, _tokenIds);
        return _tokenIds;
    }
}