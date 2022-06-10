//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Avatar is ERC721Enumerable {
    uint256 private tokenIdCounter = 0;

    struct AvatarDetails {
        string name;
    }

    // tokenId => its details
    mapping(uint256 => AvatarDetails) public avatarDetails;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function generateCharacter(string memory name) public {
        _mint(msg.sender, tokenIdCounter);
        avatarDetails[tokenIdCounter] = AvatarDetails(name);
        tokenIdCounter++;
    }
}
