//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Avatar is ERC721Enumerable {
    IERC20 private neon;

    uint256 private tokenIdCounter = 1;

    struct AvatarDetails {
        uint256 tokenId;
        string name;
    }

    // tokenId => its details
    mapping(uint256 => AvatarDetails) public avatarDetails;

    constructor(address neonTokenAddress) ERC721("Avatar", "NEONAvatar") {
        neon = IERC20(neonTokenAddress);
    }

    function generateCharacter(string memory name) public {
        bool success = neon.transferFrom(msg.sender, address(this), 1 ether);
        require(success, "Insufficient Funds: Requires 1 Neon");
        avatarDetails[tokenIdCounter] = AvatarDetails(tokenIdCounter, name);
        _mint(msg.sender, tokenIdCounter);
        tokenIdCounter++;
    }

    function getAvatarDetails (uint256 tokenId) external view returns (AvatarDetails memory) {
        return avatarDetails[tokenId];
    }
}
