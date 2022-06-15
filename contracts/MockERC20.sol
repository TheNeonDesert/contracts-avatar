//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockErc20 is ERC20 {
    constructor() ERC20("Neon", "NEON") {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
