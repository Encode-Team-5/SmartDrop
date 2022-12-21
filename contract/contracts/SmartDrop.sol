//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AirDrop is ERC20, Ownable {
    /*
    constructor function
   */
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC20(name, symbol) {
        _mint(msg.sender, totalSupply * 10**decimals());
    }

    /*
    Airdrop function which take up a array of address, single token amount and eth amount and call the
    transfer function to send the token plus send eth to the address is balance is 0
   */
    function doAirDrop(address[] memory _address, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        uint256 count = _address.length;
        for (uint256 i = 0; i < count; i++) {
            /* calling transfer function from contract */
            transfer(_address[i], _amount);
        }
        return true;
    }

    /*
    Airdrop function which take up a array of address, indvidual token amount and eth amount
   */
    function sendBatch(address[] memory _recipients, uint256[] memory _values)
        public
        onlyOwner
        returns (bool)
    {
        require(_recipients.length == _values.length);
        for (uint256 i = 0; i < _values.length; i++) {
            transfer(_recipients[i], _values[i]);
        }
        return true;
    }

    function transferEthToOnwer() public onlyOwner returns (bool) {
        require(payable(owner()).send(address(this).balance));
        return true;
    }

    /*
    function to add eth to the contract
   */
    fallback() external payable {}

    receive() external payable {}

    /*
    function to kill contract
  */

    function kill() public onlyOwner {
        selfdestruct(payable(owner()));
    }
}
