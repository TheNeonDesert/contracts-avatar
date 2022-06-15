//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Avatar is ERC721Enumerable {
    IERC20 private neon;

    uint256 private tokenIdCounter = 0;

    struct AvatarDetails {
        string name;
    }

    // tokenId => its details
    mapping(uint256 => AvatarDetails) public avatarDetails;

    constructor(address neonTokenAddress) ERC721("Avatar", "NEONAvatar") {
        neon = IERC20(neonTokenAddress);
    }

    function generateCharacter(string memory name) public {
        console.log("generateCharacter:");
        // neon.balanceOf(msg.sender)
        console.log("neon.balanceOf(msg.sender):", neon.balanceOf(msg.sender));
        bool success = neon.transferFrom(msg.sender, address(this), 1 ether);
        require(success, "Insufficient Funds: Requires 1 Neon");
        _mint(msg.sender, tokenIdCounter);
        avatarDetails[tokenIdCounter] = AvatarDetails(name);
        tokenIdCounter++;
    }
}
