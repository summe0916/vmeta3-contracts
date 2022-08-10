// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VMT is ERC20Burnable, Ownable{

    constructor(uint256 initialSupply, address owner) ERC20("VMT", "VMeta3 Token") {
        _mint(owner, initialSupply * (10**18));
        transferOwnership(owner);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * (10**18));
    }
}